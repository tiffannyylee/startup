const express = require('express');
const uuid = require('uuid');
const app = express();

let users = {};

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.get('/', (_req, res) => {
  res.send({ msg: 'Server is working' });
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
