const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
// const db = client.db('startup');
// const userCollection = db.collection('user');
// const budgetCollection = db.collection('budget');
// const paymentCollection = db.collection('payment')
let db; // Declare `db` variable here to initialize it later
let userCollection, budgetCollection, paymentCollection;

(async function initializeDatabase() {
    try {
      await client.connect();
      db = client.db('startup'); // Initialize the database
      userCollection = db.collection('user');
      budgetCollection = db.collection('budget');
      paymentCollection = db.collection('payment');
      console.log('Database connected successfully!');
    } catch (ex) {
      console.error(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();



// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}
function getBudgetByToken(token) {
    return budgetCollection.findOne( {token: token} );
}
// function createBudget(token, total, buckets, leftover) {
//     const budget = {
//         token :token,
//         total_cash: total,
//         buckets: buckets,
//         leftover: leftover,
//     };
//     budgetCollection.insertOne(budget);
//     return budget;
// }
async function createBudget(token, total, buckets, leftover) {
    const existingBudget = await budgetCollection.findOne({ token: token });
    if (existingBudget) {
      // Update the existing budget
      await budgetCollection.updateOne(
        { token: token },
        { $set: { total_cash: total, buckets: buckets, leftover: leftover } }
      );
    } else {
      // Create a new budget
      const budget = {
        token: token,
        total_cash: total,
        buckets: buckets,
        leftover: leftover,
      };
      await budgetCollection.insertOne(budget);
    }
    return { token, total_cash: total, buckets, leftover };
  }
  

async function addPayment(payment) {
  return paymentCollection.insertOne(payment);
}


module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getBudgetByToken,
  createBudget,
  addPayment
};
