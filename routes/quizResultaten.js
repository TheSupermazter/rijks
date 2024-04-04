module.exports = ({  }) => {

const express = require('express');
const router = express.Router();

const axios = require('axios')

// QUIZRESULTATEN

router.get('/', async (req, res) => {
    try {
        const fetchedData = {};
        const user = req.session.user;
        const quizAntwoorden = user.quizAntwoorden;

        if (quizAntwoorden) {
            const keys = Object.keys(quizAntwoorden); // haal de object keys uit quizAntwoorden

            for (let i = 1; i < keys.length; i += 2) { // begin bij de eerste key en voeg de volgende twee keys samen
                const key1 = keys[i];
                const key2 = keys[i + 1];
                const apiKey = process.env.RIJKS_API_KEY;
                let parameter = `${quizAntwoorden[key1]}`;

                // Voeg het volgende object toe als het bestaat (want 6 is in zn eentje)
                if (key2 && quizAntwoorden[key2]) {
                    parameter += `${quizAntwoorden[key2]}`;
                }

                const endpoint = '&imgonly=True&ondisplay=True&st=Objects';
                const response = await axios.get(`https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}${parameter}${endpoint}`);

                // Bewaar de opgehaalde data
                fetchedData[key1] = response.data; // voeg toe aan fetchedData object
            }

            req.session.artObjectNumber = artObjects.objectNumber; //de waarde van gefetchte artobject in de session cookie opslaan
            res.render('quizResultaten', { fetchedData });
        } else {
            console.log('quizAntwoorden is undefined of null');
        }
    } catch (error) {
        console.log(error);
    }
});


router.post('/addArtObject', (req, res) => {
    const artObjectNumber = req.session.artObjectNumber; //vraag artObjectNumber op uit session
    const userId = req.session.user._id;
  
    // Update the user's record in the database
    User.updateOne(
      { _id: userId },
      { $push: { mijnArtObjecten: { objectNumber: artObjectNumber, objectFound: false } } }
    )
    // .then(() => res.redirect('/myArtworks')) // redirect naar pagina met alle mijn kunstwerken
    .catch(err => console.error(err)); // handle errors
  });



return router;

}
