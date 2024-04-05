module.exports = () => {
    const express = require('express');
    const router = express.Router();

    router.get('/', (req, res) => {
        if (req.session.user) { //als user is ingelogd, dan...
            req.session.destroy(err => { //sloop de session
                if (err) {
                    console.log(err);
                }
                res.redirect('/'); // dan, Redirect naar index
            });
        } else {
            res.redirect('/'); // Redirect sowieso naar index
        }
    });

    return router;
}