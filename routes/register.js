module.exports = function({ usersCollection }) {

    const express = require('express');
    const router = express.Router();
    
    const bcrypt = require('bcrypt');
    const xss = require('xss');
    
    // REGISTER
    
    router.get('/', (req, res) => {
        res.render('register');
    });
    
    router.post('/', async (req, res) => {
        const { username, password, name, email, profilePicture } = req.body;
        let sanatisedUsername = xss(username);
        let sanatisedPassword = xss(password);
        let sanatisedName = xss(name);
        let sanatisedEmail = xss(email);
        let sanatisedProfilePicture = xss(profilePicture)
        
        const existingUser = await usersCollection.findOne({ username: sanatisedUsername });
    
        if (existingUser) {
            res.render('register', { error: 'Gebruikersnaam bestaat al' });
        } else {
            bcrypt.hash(sanatisedPassword, 10, async (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    await usersCollection.insertOne({ username: sanatisedUsername, name: sanatisedName, email: sanatisedEmail, profilePicture: sanatisedProfilePicture, password: hash,  });
                    res.redirect(`/login`);
                }
            });
        }
    });
    
    return router;
    
    }