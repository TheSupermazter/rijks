module.exports = function(global) {

const express = require('express');
const router = express.Router();
const { usersCollection } = global;
const bcrypt = require('bcrypt');

// Login

router.get('/', (req, res) => {
    // Check if user is already logged in
    if (req.session.user) {
        res.redirect(`/dashboard/${req.session.user._id}`);
    } else {
        res.render('login');
    }
});

router.post('/', async (req, res) => {
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

return router;

}