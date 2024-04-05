module.exports = () => {

    const express = require('express');
    const router = express.Router();

    const axios = require('axios');

    // INFO

    router.get('/', async (req, res) => {
        try {
            const fetchedCollection = {};
            const fetchedDetails = {};
    
            const objectNumber = req.params.artObjectNumber;            
            const apiKey = process.env.RIJKS_API_KEY;
    
            const fetchCollection = await axios.get(`https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&objectNumber=${objectNumber}`);
            const fetchDetails = await axios.get(`https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=${apiKey}`);

            console.log(fetchCollection, fetchDetails);

            fetchedCollection = fetchCollection.data;
            fetchedDetails = fetchDetails.data;
    
            res.render('info', {
                fetchedCollection,
                fetchedDetails
            });
        } catch (err) {
            console.error(err);
        }
    });

    return router;

}