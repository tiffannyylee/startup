const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./serviceDatabase.js');
const { peerProxy } = require('./webSocket.js');

let users = {};
let budgets = {};
let payments = {};

const authCookieName = 'token';


const port = process.argv.length > 2 ? process.argv[2] : 4000;



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



// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});


// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  console.log("Auth token:", authToken); // Debugging
  const user = await DB.getUserByToken(authToken);
  console.log("User:", user); // Debugging
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});



//DATABASE get budget
apiRouter.get('/budget', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  const budget = await DB.getBudgetByToken(authToken) || { total_cash: 0, buckets : { bucket1: 0, bucket2: 0, bucket3: 0 },leftover:0 };
  console.log("budget:", budget)
  res.status(200).send(budget);
})



//DATABASE update budget
apiRouter.post('/budget', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  const { total_cash, buckets, leftover } = req.body;
  if (typeof buckets !== 'object' || Array.isArray(buckets)) {
    return res.status(400).send({ msg: 'Invalid buckets format' });
  }
  const updatedBudget = await DB.createBudget(authToken, total_cash, buckets, leftover);

  res.status(200).send({ msg: 'Budget updated' });
})

//DATABASE save payments
apiRouter.post('/payments', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }

  const { payments: newPayments } = req.body;

  // Initialize user payments if not already present
  const updatedPayment = await DB.createOrUpdatePayment(authToken, newPayments)


  res.status(200).send({ msg: 'Payments saved successfully.' });
});


//DATABASE get payments
apiRouter.get('/payments', async(req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }

  const userPayments = await DB.getPaymentByToken(authToken) || {payments:[]};
  res.status(200).send(userPayments);
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

peerProxy(httpService)