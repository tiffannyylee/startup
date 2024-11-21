const express = require('express');
const uuid = require('uuid');
const app = express();

let users = {};

const port = process.argv.length > 2 ? process.argv[2] : 3000;



app.use(express.json());
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.get('/', (_req, res) => {
  res.send({ msg: 'Server is working' });
});

var testData = {test:"testdata"}
apiRouter.get('/test', (_req, res) => {
  console.log("in get test")
  res.send(testData);
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
