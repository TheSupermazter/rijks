require('dotenv').config() 

const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId, CommandStartedEvent } = require('mongodb');


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
client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(express.urlencoded({ extended: true })); // Middleware to parse POST request body
app.set('view engine', 'ejs'); // EJS as view engine
app.use(express.static(path.join(__dirname, 'public'))); // static content sits in public


// Express sessions middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 * 8}
}));

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })

// FUNCTIONS ____________________________________________________________________________________________________________________

// global constants
const db = client.db(process.env.DB_NAME);
const usersCollection = db.collection(process.env.DB_USER_COLLECTION);
const vragenCollection = db.collection(process.env.DB_VRAGEN_COLLECTION);

const global = {
  client,
  ObjectId,
  db,
  usersCollection,
  vragenCollection,
};

const dashboardRoutes = require('./routes/dashboard')(global);
const loginRoutes = require('./routes/login')(global);
const quizResultatenRoutes = require('./routes/quizResultaten')(global);
const vragenRoutes = require('./routes/vragen')(global);


app.use('/dashboard/:id', dashboardRoutes);
app.use('/login', loginRoutes);
app.use('/quizResultaten', quizResultatenRoutes);
app.use('/vragen', vragenRoutes);


// INDEX

app.get('/', (req, res) => {
    res.render('index');
});




// SERVER ERRORS ____________________________________________________________________________________________________________________

// 404
app.use((req, res) => {
console.error('404 error at URL: ' + req.url)
res.status(404).send('404 error at URL: ' + req.url)
    })

// 500
app.use((err, req, res) => {
    console.error(err.stack)
    res.status(500).send('500: server error')
  })