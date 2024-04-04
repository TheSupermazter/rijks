module.exports = () => {

    const express = require('express');
    const router = express.Router();

    // FAVORITES

    router.get('/', async (req, res) => {
        res.render('favorites');
    });

    return router;

}