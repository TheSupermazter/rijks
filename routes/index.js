module.exports = () => {

    const express = require('express');
    const router = express.Router();

    // INDEX

    router.get('/', async (req, res) => {
        const user = req.session.user;

        if (user) {
            res.render('index', {
                name: user.name
            });
        } else {
            res.render('login');
        }
    });

    return router;

}