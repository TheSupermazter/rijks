module.exports = function() {

const express = require('express');
const router = express.Router();

// QUIZRESULTATEN

router.get('/', (req, res) => {
    res.render('quizResultaten');
});

return router;

}
