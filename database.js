const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
})

// Connect to MongoDB
const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};


// global constants
const db = client.db(process.env.DB_NAME);
const usersCollection = db.collection(process.env.DB_USER_COLLECTION);
const vragenCollection = db.collection(process.env.DB_VRAGEN_COLLECTION);

module.exports = {
  connectDB,
  client,
  ObjectId,
  db,
  usersCollection,
  vragenCollection,
};
