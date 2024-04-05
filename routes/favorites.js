module.exports = ({ usersCollection }) => {

    const { ObjectId } = require('mongodb');
    
    const express = require('express');
    const router = express.Router();

    const axios = require('axios');


    // FAVORITES

    router.get('/', async (req, res) => {
        const user = req.session.user;
    
        if (user) {
            const userData = await usersCollection.findOne({ _id: new ObjectId(user._id) });

            const objectNumbers = userData.mijnArtObjecten.map(object => object.objectNumber);
            const apiKey = process.env.RIJKS_API_KEY;

            let fetchedDetails = {};

            const fetchPromises = objectNumbers.map(objectNumber => 
                axios.get(`https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=${apiKey}&imgonly=True&ondisplay=True&st=Objects`)
            );

            const fetchCollectionResponses = await Promise.all(fetchPromises);

            console.log(fetchCollectionResponses);

            fetchedDetails = fetchCollectionResponses.map(response => response.data);

            const combinedDetails = userData.mijnArtObjecten.map((object, index) => {
                return {
                    ...object,
                    details: fetchedDetails[index]
                };
            });

            res.render('favorites', {
                user: userData,
                combinedDetails: combinedDetails
            });
        } else {
            res.render('login');
        }
    });
    
    
    

    return router;

}
