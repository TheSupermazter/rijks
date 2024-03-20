module.exports = function(global) {

    const express = require('express');
    const router = express.Router();
    const { usersCollection } = global;
    
    const bcrypt = require('bcrypt');
    
    // REGISTER
    
    router.get('/', (req, res) => {
        res.render('register');
    });
    
    router.post('/', async (req, res) => {
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
    
    return router;
    
    }