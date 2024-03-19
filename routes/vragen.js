const express = require('express');
const router = express.Router();

//global
const usersCollection = db.collection(process.env.DB_USER_COLLECTION);
const vragenCollection = db.collection(process.env.DB_VRAGEN_COLLECTION);

// VRAGEN

router.get('/vragen/:number', async (req, res) => {
    const number = parseInt(req.params.number, 10);
    const vraag = await vragenCollection.findOne({ "number": number });
    res.render('vragen', { vraag: vraag, nextId: number + 1, prevId: number - 1}); //zorgt ervoor dat de http > vragen/ +1 worden of -1 bij navigeren van de knoppen
});


router.post('/vragen', async (req, res) => {
    const questionNumber = req.body.questionNumber; //nummer van de vraag > nodig om de geantwoordde  vraag aan het juiste vraagnummer te koppelen
    const antwoord = req.body.answer; //een antwoord in de form
    const navigate = req.body.navigate; // navigate is de buttonnaam van de next en prev buttons > zodat ik elke waarde kan opslaan in de DB

    const user = req.session.user;

    if (user && client.topology.isConnected()) { //als de user is verbonden en ingelogd
        const result = await usersCollection.updateOne( //updat het volgende in de DB
            { _id: new ObjectId(user._id) }, //op het user id uit de session cookie
            { $set: { [`quizAntwoorden.${questionNumber}`]: antwoord } } // set > pas aan, of voeg toe > vraagnummer: [gegeven antwoord]
        );
        if (result.modifiedCount > 0) { // als er 1 o0f meer onderdelen zijn veranderd of aangepast...
            if (navigate) { //redirect naar het volgende vraagnummer
                res.redirect(`/vragen/${navigate}`); //vragen + het vraagnummer die ik uit de form haal
            } else {
                res.redirect(`/quizResultaten`); //anders, direct naar de quizResultaten
            }
        }
    } else { // als  hij niet ingelogd is, dan word doorgestuurd naar login
        res.redirect(`/login`);
    }
});

module.exports = router;
