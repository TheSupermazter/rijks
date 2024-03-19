const express = require('express');
const router = express.Router();

// global
const usersCollection = db.collection(process.env.DB_USER_COLLECTION);

// Login

router.get('/login', (req, res) => {
    // Check if user is already logged in
    if (req.session.user) {
        res.redirect(`/dashboard/${req.session.user._id}`);
    } else {
        res.render('login');
    }
});

router.post('/login', async (req, res) => {
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

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
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

module.exports = router;