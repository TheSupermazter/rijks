module.exports = function(global) {

const express = require('express');
const router = express.Router();

// QUIZRESULTATEN

router.get('/quizResultaten', (req, res) => {
    res.render('quizResultaten');
});

return router;

}
