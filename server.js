require('dotenv').config() 

const express = require('express');
const app = express();
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId, CommandStartedEvent } = require('mongodb');

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

app.use(express.urlencoded({ extended: true })); // Middleware to parse POST request body
app.set('view engine', 'ejs'); // EJS as view engine
app.use(express.static(path.join(__dirname, 'public'))); // static content sits in public


// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })


// Server errors

// 404
// app.use((req, res) => {
// console.error('404 error at URL: ' + req.url)
// res.status(404).send('404 error at URL: ' + req.url)
//     })

// // 500
// app.use((err, req, res) => {
//     console.error(err.stack)
//     res.status(500).send('500: server error')
//   })



  // FUNCTIONS ____________________________________________________________________________________________________________________

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', async (req, res) => {
    const { username, password } = req.body;
    const db = client.db('clusterProjectTech');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({username, password});

    if (user) {
        res.redirect(`/dashboard/${user._id}`);
    } else {
        res.render('index', { error: 'Invalid username or password' });
    }    

});


app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const db = client.db('clusterProjectTech');
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
        res.render('register', { error: 'Username already exists' });
    } else {
        const insertedUser = await usersCollection.insertOne({ username, email, password });
        res.redirect(`/dashboard/${insertedUser.insertedId}`);
    }
    
});


app.get('/dashboard/:id', async (req, res) => {
    const userId = req.params.id;
    const db = client.db('clusterProjectTech');
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    
    if (user) {
        res.render('dashboard', { username: user.username });
    } else {
        res.render('dashboard', { error: 'User not found' });
    }
});





