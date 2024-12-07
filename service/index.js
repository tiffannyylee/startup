const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./serviceDatabase.js');

let users = {};
let budgets = {};
let payments = {};

const authCookieName = 'token';


const port = process.argv.length > 2 ? process.argv[2] : 3000;



app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());


//middleware
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//test server
app.get('/', (_req, res) => {
  res.send({ msg: 'Server is working' });
});

var testData = {test:"testdata"}
apiRouter.get('/test', (_req, res) => {
  console.log("in get test")
  res.send(testData);
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// // GetAuth login an existing user
// apiRouter.post('/auth/login', async (req, res) => {
//   const user = users[req.body.email];
//   if (user) {
//     if (req.body.password === user.password) {
//       user.token = uuid.v4();
//       res.send({ token: user.token });
//       return;
//     }
//   }
//   res.status(401).send({ msg: 'Unauthorized' });
// });

// GetUSers
apiRouter.get('/users', (_req, res) => {
  res.send(users);
});

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// // CreateAuth a new user
// apiRouter.post('/auth/create', async (req, res) => {
//   const user = users[req.body.email];
//   if (user) {
//     res.status(409).send({ msg: 'Existing user' });
//   } else {
//     const newUser = { email: req.body.email, password: req.body.password, token: uuid.v4() };
//     users[newUser.email] = newUser;

//     res.send({ token: newUser.token });
//   }
// });


// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// // DeleteAuth logout a user
// apiRouter.delete('/auth/logout', (req, res) => {
//   const user = Object.values(users).find((u) => u.token === req.body.token);
//   if (user) {
//     delete user.token;
//   }
//   res.status(204).end();
// });

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.get('/budget', (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = DB.getUserByToken(authToken);
  if(!user){
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  try {
    const budget = budgetCollection.findOne({ email: user.email });
    if (!budget) {
      // Initialize with a default budget structure if no budget exists
      const defaultBudget = { email: user.email, total_cash: 0, buckets: { bucket1: 0, bucket2: 0, bucket3: 0 }, leftover: 0 };
      budgetCollection.insertOne(defaultBudget);
      res.status(200).send(defaultBudget);
    } else {
      res.status(200).send(budget);
    }
  } catch (err) {
    res.status(500).send({ msg: 'Error retrieving budget', error: err.message });
  }

})

// // get budget
// apiRouter.get('/budget', (req, res) => {
//   const user = Object.values(users).find((u) => u.token === req.headers.authorization);
//   if (!user) {
//     res.status(401).send({ msg: 'Unauthorized' });
//     return;
//   }

//   const budget = budgets[user.email] || { total_cash: 0, buckets: { bucket1: 0, bucket2: 0, bucket3: 0 } };
//   res.status(200).send(budget);
// });

// Save or update user budget
apiRouter.post('/budget', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.headers.authorization);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  const { total_cash, buckets, leftover } = req.body;
  if (typeof buckets !== 'object' || Array.isArray(buckets)) {
    return res.status(400).send({ msg: 'Invalid buckets format' });
  }
  const currentBudget = budgets[user.email] || { total_cash: 0, buckets: {},leftover:0 };
  const updatedBuckets = { ...currentBudget.buckets, ...buckets };
  budgets[user.email] = {
    total_cash,
    buckets: updatedBuckets, leftover
    
  };
  console.log("budget updated")
  res.status(200).send({ msg: 'Budget updated' });
});
//savepaymetns
apiRouter.post('/payments', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.headers.authorization);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }

  const { payments: newPayments } = req.body;

  if (!Array.isArray(newPayments)) {
    return res.status(400).send({ msg: 'Invalid payments format. Expected an array.' });
  }

  // Initialize user payments if not already present
  if (!payments[user.email]) {
    payments[user.email] = [];
  }

  // Append new payments to existing payments
  payments[user.email] = [...payments[user.email], ...newPayments];

  console.log(`Payments updated for ${user.email}:`, payments[user.email]);
  res.status(200).send({ msg: 'Payments saved successfully.' });
});
//getpayments
apiRouter.get('/payments', (req, res) => {
  const token = req.headers.authorization;

  const user = Object.values(users).find((u) => u.token === token);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }

  const userPayments = payments[user.email] || [];
  res.status(200).send({ payments: userPayments });
});



// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
