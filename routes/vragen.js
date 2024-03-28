module.exports = ( {usersCollection, vragenCollection} ) => {

    const { ObjectId } = require('mongodb');

    const express = require('express');
    const router = express.Router();

    // VRAGEN
    
    router.get('/:number', async (req, res) => {
        const number = parseInt(req.params.number, 10);
        const vraag = await vragenCollection.findOne({ "number": number });

    // loop over vraag objecten
    for (let key in vraag) {
        if (Array.isArray(vraag[key]) && key === 'choices') {
            // Log alleen de "endpoint" waarden van de objecten in de "choices" array
            console.log(`Endpoints:`);
            vraag[key].forEach(choice => {
                console.log(choice.endpoint);
            });
        }
    }
    
        // req.session.vraag = vraag; // Sla de vraag op in de session
    
        res.render('vragen', { vraag: vraag, nextId: number + 1, prevId: number - 1});
    });

    
    router.post('/', async (req, res) => {
        const questionNumber = req.body.questionNumber; //nummer van de vraag > nodig om de geantwoordde  vraag aan het juiste vraagnummer te koppelen
        const antwoord = req.body.answer; //een antwoord in de form
        const navigate = req.body.navigate; // navigate is de buttonnaam van de next en prev buttons > zodat ik elke waarde kan opslaan in de DB
    
        const user = req.session.user;
    
        if (user) { //als de user is verbonden en ingelogd
            const result = await usersCollection.updateOne( //update het volgende in de DB
                { _id: new ObjectId(user._id) }, //op het user id uit de session cookie
                { $set: { [`quizAntwoorden.${questionNumber}`]: antwoord } } // set > pas aan, of voeg toe > vraagnummer: [gegeven antwoord]
            );
            if (result) { // als er iets wordt geupdate in de DB
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


// Wanneer de gebruiker een keuze heeft gemaakt
// router.post('/', async (req, res) => {
//     const antwoord = req.body.answer; //een antwoord in de form
//     const navigate = req.body.navigate; // navigate is de buttonnaam van de next en prev buttons

//     const user = req.session.user;
//     const vraag = req.session.vraag; // Haal de vraag uit de session

//     if (user && vraag) { //als de user is verbonden en ingelogd en de vraag bestaat
//         // Zoek het gekozen antwoord in de choices
//         const gekozenAntwoord = vraag.choices.find(choice => choice.name === antwoord);

//         const result = await usersCollection.updateOne( //update het volgende in de DB
//             { _id: new ObjectId(user._id) }, //op het user id uit de session cookie
//             { $set: { [`quizAntwoorden.${vraag.number}`]: gekozenAntwoord.endpoint } } // set > pas aan, of voeg toe > vraagnummer: [gegeven antwoord]
//         );
//         if (result) { // als er iets wordt geupdate in de DB
//             if (navigate) { //redirect naar het volgende vraagnummer
//                 res.redirect(`/vragen/${navigate}`); //vragen + het vraagnummer die ik uit de form haal
//             } else {
//                 res.redirect(`/quizResultaten`); //anders, direct naar de quizResultaten
//             }
//         }
//     } else { // als  hij niet ingelogd is, dan word doorgestuurd naar login
//         res.redirect(`/login`);
//     }
// });


    return router;
    
    }
    