require('dotenv').config() 

const express = require('express');
const app = express();
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId, CommandStartedEvent } = require('mongodb')

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
})


// Connect to MongoDB
client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Middleware to parse POST request body
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', onIndex);
app.get('/register', onRegister);
app.post('/register', onRegisterPost);
app.get('/dashboard/:name', onDashboard);


// Start the server
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});


async function onIndex(req, res) {
    res.render('index');
}

async function onRegister(req, res) {
    res.render('register');
}

async function onRegisterPost(req, res) {
    const { username, email, password } = req.body;

    // Get reference to the database
    const db = client.db('clusterProjectTech'); // Replace 'your_database_name' with your actual database name

    // Get reference to the users collection
    const usersCollection = db.collection('users');

    // Insert new user document
    await usersCollection.insertOne({ username, email, password });

    // Redirect to dashboard after registration
    res.redirect(`/dashboard/${username}`);
}


async function onDashboard(req, res) {
    const username = req.params.name; // Get the username from the URL parameter
    res.render('dashboard', { username });
}

