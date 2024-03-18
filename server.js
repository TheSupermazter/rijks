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
const vragenCollection = db.collection(process.env.DB_VRAGEN_COLLECTION);



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
        bcrypt.compare(password, user.password, (err, isMatch) => { //vergelijkt de het wachtwoord en het wachtwoord van de ingevulde user in de database
            if (err) { 
                console.log(err);
            } else if (isMatch) {
                req.session.user = user; // maak een session aan voor de  ingelogde gebruiker
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
    const { username, password, name, email, profilePicture } = req.body;
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
        res.render('register', { error: 'Gebruikersnaam bestaat al' });
    } else {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                console.log(err);
            } else {
                await usersCollection.insertOne({ username, name, email, password: hash, profilePicture });
                res.redirect(`/login`);
            }
        });
    }
});




// DASHBOARD

app.get('/dashboard/:id', async (req, res) => {
    const user = req.session.user;
    
    if (user) {
        res.render('dashboard', { name: user.name });
    } else {
        res.render('dashboard', { error: 'User not found' });
    }
});



// VRAGEN

app.get('/vragen/:number', async (req, res) => {
    const number = parseInt(req.params.number, 10);
    const vraag = await vragenCollection.findOne({ "number": number });
    res.render('vragen', { vraag: vraag, nextId: number + 1, prevId: number - 1});
});


app.post('/vragen', async (req, res) => {
    const questionNumber = req.body.questionNumber;
    const antwoord = req.body.question;
    const navigate = req.body.navigate;

    const user = req.session.user;

    if (user && client.topology.isConnected()) {
        const result = await usersCollection.updateOne(
            { _id: new ObjectId(user._id) }, 
            { $set: { [`quizAntwoorden.${questionNumber}`]: antwoord } }
        );
        if (result.modifiedCount > 0) {
            if (navigate) {
                res.redirect(`/vragen/${navigate}`);
            } else {
                res.redirect(`/quizResultaten`);
            }
        }
    } else {
        res.send('Geen gebruiker ingelogd of database is niet verbonden');
    }
});






app.get('/quizResultaten', (req, res) => {
    res.render('quizResultaten');
});




// const rijksUrl = `https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.RIJKS_API_KEY}&ondisplay=True&imgonly=True`;

// let choiceQ1 = `&f.hnrCode.section.sort=17de+Eeuw`;
// let choiceQ2 = `&type=schilderij`;

// const objectChosen = choiceQ1 + choiceQ2;
// object1.math.random etc.




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