module.exports = () => {

const express = require('express');
const router = express.Router();

// DASHBOARD

router.get('/', async (req, res) => {
    const user = req.session.user;
    
    if (user) {
        res.render('dashboard', { name: user.name });
    } else {
        res.render('dashboard', { error: 'User not found' });
    }
});

return router;

}
