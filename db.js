const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

let client = null;

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

async function connectDB() {
  if (client) {
    return client;
  }

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  console.log('Connected to MongoDB');
  
  return client;
}

module.exports = { connectDB };
