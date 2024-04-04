module.exports = ({ usersCollection }) => {

    const { ObjectId } = require('mongodb');

    const express = require('express');
    const router = express.Router();

    const axios = require('axios');

    // QUIZRESULTATEN

    router.get('/', async (req, res) => {
        try {
            const fetchedData = {};
            const user = req.session.user;
            const quizAntwoorden = user.quizAntwoorden;
            const apiKey = process.env.RIJKS_API_KEY;

            if (quizAntwoorden) {
                const keys = Object.keys(quizAntwoorden); // haal de object keys uit quizAntwoorden

                for (let i = 1; i < keys.length; i += 2) { // begin bij de eerste key en voeg de volgende twee keys samen
                    const key1 = keys[i];
                    const key2 = keys[i + 1];
                    let parameter = `${quizAntwoorden[key1]}`;

                    // Voeg het volgende object toe als het bestaat (want 10 is in zn eentje)
                    if (key2 && quizAntwoorden[key2]) {
                        parameter += `${quizAntwoorden[key2]}`;
                    }

                    const endpoint = '&imgonly=True&ondisplay=True&st=Objects';
                    const response = await axios.get(`https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}${parameter}${endpoint}`);

                    // Bewaar de opgehaalde data
                    fetchedData[key1] = response.data; // voeg toe aan fetchedData object
                }

                // Selecteer een willekeurig kunstwerk
                let obKeys = Object.keys(fetchedData);
                let randomKey = obKeys[Math.floor(Math.random() * obKeys.length)];
                if (fetchedData[randomKey].artObjects && fetchedData[randomKey].artObjects.length > 0) {
                    let randomIndex = Math.floor(Math.random() * fetchedData[randomKey].artObjects.length);
                    let artObjects = fetchedData[randomKey].artObjects[randomIndex];

                    // Sla de objectNumber op in de sessiecookie
                    req.session.artObjectNumber = artObjects.objectNumber;
                }

                const artObjectNumber = req.session.artObjectNumber; // Get artObjectNumber from session

                const getCollectionDetails = await axios.get(`https://www.rijksmuseum.nl/api/nl/collection/${artObjectNumber}?key=${apiKey}`);
                fetchedDetails = getCollectionDetails.data


                res.render('quizResultaten', {
                    fetchedData,
                    fetchedDetails
                });
            } else {
                console.log('quizAntwoorden is undefined of null');
            }
        } catch (error) {
            console.log(error);
        }
    });

    //ALS DE URL ROUTE WORDT GEZET OP MIJNKUNSTWERKEN PAGINA, KAN DEZE WELLICHT WEG, BEHALVE DE RES.RENDER NAAR DE GOEIE PAGINA
    router.post('/', async (req, res) => {
        const artObjectNumber = req.session.artObjectNumber; // Get artObjectNumber from session
        const userId = req.session.user._id; // Get user's ID from session

        try { // Update user met artObject in database
            const result = await usersCollection.updateOne({
                _id: new ObjectId(userId)
            }, {
                $push: {
                    mijnArtObjecten: {
                        objectNumber: artObjectNumber,
                        objectFound: false
                    }
                }
            });

            if (result.modifiedCount === 1) {
                console.log('Successfully updated the user');
            } else {
                console.log('User update failed');
            }

            user = req.session.user;
            res.redirect(`/dashboard/${user._id}`);
        } catch (err) {
            console.error(err); // Handle errors
        }
    });


    router.post('/update-object-found', async (req, res) => {
        const artObjectNumber = req.session.artObjectNumber; // Haal het objectnummer uit het verzoek
        const userId = req.session.user._id; // Haal de gebruikers-ID uit de sessie
    
        try {
            const user = req.session.user;
    
            const artObject = user.mijnArtObjecten.find(obj => obj.objectNumber === artObjectNumber); // kijk of het object al bestaat in de DB
    
            if (artObject) { // Als het object al bestaat in de DB, update het
                const result = await usersCollection.updateOne({
                    _id: new ObjectId(userId),
                    'mijnArtObjecten.objectNumber': artObjectNumber
                }, {
                    $set: {
                        'mijnArtObjecten.$.objectFound': true
                    }
                });
    
                if (result.modifiedCount === 1) {
                    console.log('Successfully updated the object');
                } else {
                    console.log('Object update failed');
                }
            } else { // Als het object niet bestaat in de DB, voeg het toe
                const result = await usersCollection.updateOne({
                    _id: new ObjectId(userId)
                }, {
                    $push: {
                        mijnArtObjecten: {
                            objectNumber: artObjectNumber,
                            objectFound: true
                        }
                    }
                });
    
                if (result.modifiedCount === 1) {
                    console.log('Successfully added the object');
                } else {
                    console.log('Object addition failed');
                }
            }
        } catch (err) {
            console.error(err);
        }
    });
    
    
    

    return router;

}
