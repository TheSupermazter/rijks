require('dotenv').config() 

const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId, CommandStartedEvent } = require('mongodb');
const bcrypt = require('bcrypt');
const { error } = require('console');

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
const db = client.db(process.env.DB_NAME);  //process.env.DB_NAME
const usersCollection = db.collection(process.env.DB_USER_COLLECTION);


// INDEX

app.get('/', (req, res) => {
    res.render('index');
});



// Login

app.get('/login', (req, res) => {
    // Check if user is already logged in
    if (req.session.user) {
        res.redirect(`/dashboard/${req.session.user._id}`);
    } else {
        res.render('login');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await usersCollection.findOne({ username });

    if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.log(err);
            } else if (isMatch) {
                req.session.user = user;
                res.redirect(`/dashboard/${user._id}`);
            } else {
                res.render('login', { error: 'ongeldige gebruikersnaam of wachtwoord' });
            }
        });
    } else {
        res.render('login', { error: 'ongeldige gebruikersnaam of wachtwoord' });
    }
});


// REGISTER

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { username, password, name, email, imageUrl } = req.body;
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
        res.render('register', { error: 'Gebruikersnaam bestaat al' });
    } else {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                console.log(err);
            } else {
                const insertedUser = await usersCollection.insertOne({ username, name, email, password: hash, imageUrl });
                res.redirect(`/dashboard/${insertedUser.insertedId}`);
            }
        });
    }
});




// DASHBOARD

app.get('/dashboard/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    
    if (user) {
        res.render('dashboard', { name: user.name });
    } else {
        res.render('dashboard', { error: 'User not found' });
    }
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