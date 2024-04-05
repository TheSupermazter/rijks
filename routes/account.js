module.exports = () => {

    const express = require('express');
    const router = express.Router();

    // ACCOUNT

    router.get('/', async (req, res) => {
        res.render('favorites');
    });

    return router;

}