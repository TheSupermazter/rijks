module.exports = ({usersCollection}) => {

const express = require('express');
const router = express.Router();

const getEndpoints = require('../utils/getEndpoints'); // naar de function die de endpoints verbind aan het antwoord

// QUIZRESULTATEN

router.get('/', async (req, res) => {
    try {
        if (!req.session.user) { //als de user nog niet is ingelogd
            return res.redirect('/login');
        }

        const userId = req.session.user._id; //haal user_id op
        let endpoints = await getEndpoints(userId.quizAntwoorden); //endpoints komt uit /getEndpoints > plakt het juiste endpoint aan de keuze vd user

        res.render('quizResultaten', { endpoints }); // Voeg endpoints toe aan de data die naar de view wordt gestuurd
    } catch (error) {
        console.error(error);
    }
});


return router;

}
