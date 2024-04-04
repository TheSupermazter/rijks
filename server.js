require('dotenv').config() 

const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const { connectDB, usersCollection, vragenCollection } = require('./database');

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

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
  })


  
// FUNCTIONS ____________________________________________________________________________________________________________________

const dashboardRoutes = require('./routes/dashboard')({ usersCollection, vragenCollection });
const loginRoutes = require('./routes/login')({ usersCollection, vragenCollection });
const quizResultatenRoutes = require('./routes/quizResultaten')({ usersCollection, vragenCollection });
const vragenRoutes = require('./routes/vragen')({ usersCollection, vragenCollection });
const registerRoutes = require('./routes/register')({ usersCollection, vragenCollection });
const logOutRoutes = require('./routes/logOut')({ usersCollection, vragenCollection });
const infoRoutes = require('./routes/info')({ usersCollection, vragenCollection });
const favoritesRoutes = require('./routes/favorites')({ usersCollection, vragenCollection });
const notFoundFavoritesRoutes = require('./routes/notFoundFavorites')({ usersCollection, vragenCollection });

app.use('/dashboard/:id', dashboardRoutes);
app.use('/login', loginRoutes);
app.use('/quizResultaten', quizResultatenRoutes);
app.use('/vragen', vragenRoutes);
app.use('/register', registerRoutes);
app.use('/logout', logOutRoutes);
app.use('/info/:artObjectNumber', infoRoutes);
app.use('/favorites/:artObjectNumber', favoritesRoutes);
app.use('/notFoundFavorites/:artObjectNumber', notFoundFavoritesRoutes);



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