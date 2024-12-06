const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rental');

(async function testConnection() {
  console.log('Starting connection test...');
  try {
    console.log('Attempting to connect...');
    await client.connect(); // Attempt to connect to the database
    console.log('Connected successfully to database!');
    console.log('Pinging database...');
    await db.command({ ping: 1 }); // Test the database connection with a ping
    console.log('Ping successful!');
  } catch (ex) {
    console.error(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1); // Exit with an error code if the connection fails
  } finally {
    console.log('Closing the connection...');
    await client.close(); // Close the connection
  }
})();
