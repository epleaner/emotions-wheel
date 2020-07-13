const MongoClient = require('mongodb');
require('dotenv').config();

module.exports = {
  connectToMongoDB: async function () {
    try {
      const client = await new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).catch((e) => {
        console.error('Database connection error: ' + e.message);
      });

      if (!client.isConnected()) await client.connect();

      console.log('connecting to', process.env.DB_NAME);
      const db = await client.db(process.env.DB_NAME);

      return { client, db };
    } catch (e) {
      console.error('Something went wrong...', e.message);
    }
  },
};
