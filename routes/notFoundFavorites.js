module.exports = () => {

    const express = require('express');
    const router = express.Router();

    // NOT FOUND FAVORITES

    router.get('/notFoundFavorites:', async (req, res) => {
        res.render('notFoundFavorites:artObjectNumber');
    });

    return router;

}