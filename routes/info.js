module.exports = () => {

    const express = require('express');
    const router = express.Router();

    // INFO

    router.get('/', async (req, res) => {
        res.render('info');
    });

    return router;

}