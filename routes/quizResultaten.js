module.exports = () => {

const express = require('express');
const router = express.Router();

// QUIZRESULTATEN

router.get('/', (req, res) => {
    res.render('quizResultaten');
});




router.post('/quizResultaten', async (req, res) => {
    const { answer, questionNumber } = req.body;
    const questionIndex = parseInt(questionNumber) - 1; // Omdat de array zero-based is
    
    // Controleer of de vraagnummer en het antwoord geldig zijn
    if (questionIndex >= 0 && questionIndex < questionMappings.length && questionMappings[questionIndex].hasOwnProperty(answer)) {
        // Krijg het bijbehorende URL-endpoint voor de keuze
        const endPoint = questionMappings[questionIndex][answer];
        
        // Construeer de volledige URL
        const baseURL = "https://www.rijksmuseum.nl/api/nl/collection?key=mFMeRfGA";
        const URL = baseURL + endPoint;
        
        // Voer hier je fetch-actie uit met de geconstrueerde URL
        // await fetch(URL);
        
        // Hier kun je verdere verwerking doen met de verkregen gegevens
        // en een reactie terugsturen naar de gebruiker
        res.send(`Je hebt gekozen voor ${answer}. URL: ${URL}`);
    } else {
        // Ongeldige vraagnummer of antwoord, stuur een foutmelding terug naar de gebruiker
        res.status(400).send('Ongeldige vraagnummer of antwoord');
    }
});

return router;

}
