const express = require('express');
const uuid = require('uuid');
const app = express();

let users = {};
let budgets = {};

const port = process.argv.length > 2 ? process.argv[2] : 3000;



app.use(express.json());


// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//middleware
app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.send({ msg: 'Server is working' });
});

var testData = {test:"testdata"}
apiRouter.get('/test', (_req, res) => {
  console.log("in get test")
  res.send(testData);
});
// GetUSers
apiRouter.get('/users', (_req, res) => {
  res.send(users);
});

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const newUser = { email: req.body.email, password: req.body.password, token: uuid.v4() };
    users[newUser.email] = newUser;

    res.send({ token: newUser.token });
  }
});
// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});
// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

// get budget
apiRouter.get('/budget', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.headers.authorization);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }

  const budget = budgets[user.email] || { total_cash: 0, buckets: { bucket1: 0, bucket2: 0, bucket3: 0 } };
  res.status(200).send(budget);
});

// Save or update user budget
apiRouter.post('/budget', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.headers.authorization);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }

  const { total_cash, buckets } = req.body;
  if (typeof buckets !== 'object' || Array.isArray(buckets)) {
    return res.status(400).send({ msg: 'Invalid buckets format' });
  }

  const currentBudget = budgets[user.email] || { total_cash: 0, buckets: {} };
  const updatedBuckets = { ...currentBudget.buckets, ...buckets };
  budgets[user.email] = {
    total_cash,
    buckets: updatedBuckets,
    
  };
  console.log("budget updated")
  res.status(200).send({ msg: 'Budget updated' });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
