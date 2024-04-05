require('dotenv').config() 

const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const { connectDB, usersCollection, vragenCollection } = require('./database');
const axios = require('axios');
const bodyParser = require('body-parser');

connectDB()

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

// Gebruik body-parser middleware om aanvraaglichamen te parseren
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })


  
// FUNCTIONS ____________________________________________________________________________________________________________________

const indexdRoutes = require('./routes/index')({ usersCollection, vragenCollection });
const loginRoutes = require('./routes/login')({ usersCollection, vragenCollection });
const quizResultatenRoutes = require('./routes/quizResultaten')({ usersCollection, vragenCollection });
const vragenRoutes = require('./routes/vragen')({ usersCollection, vragenCollection });
const registerRoutes = require('./routes/register')({ usersCollection, vragenCollection });
const logOutRoutes = require('./routes/logOut')({ usersCollection, vragenCollection });
const favoritesRoutes = require('./routes/favorites')({ usersCollection, vragenCollection });
const notFoundFavoritesRoutes = require('./routes/notFoundFavorites')({ usersCollection, vragenCollection });
const accountRoutes = require('./routes/account')({ usersCollection, vragenCollection });


app.use('/', indexdRoutes);
app.use('/login', loginRoutes);
app.use('/quizResultaten', quizResultatenRoutes);
app.use('/vragen', vragenRoutes);
app.use('/register', registerRoutes);
app.use('/logout', logOutRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/notFoundFavorites/:artObjectNumber', notFoundFavoritesRoutes);
app.use('/account', accountRoutes);




// INFO
// als ik een eigen route maakt, wilt hij de urlencoded middleware niet mee nemen, dus moest het hier...

app.get('/info/:artObjectNumber', async (req, res) => {
    try {
        let fetchedCollection = {};
        let fetchedDetails = {};

        const objectNumber = req.params.artObjectNumber;          
        const apiKey = process.env.RIJKS_API_KEY;

        const fetchCollection = await axios.get(`https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&imgonly=True&ondisplay=True&st=Objects`);
        const fetchDetails = await axios.get(`https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=${apiKey}`);

        console.log(fetchCollection);
        console.log(fetchDetails);

        fetchedCollection = fetchCollection.data;
        fetchedDetails = fetchDetails.data;

        res.render('info', {
            fetchedCollection,
            fetchedDetails
        });
    } catch (err) {
        console.error(err);
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