module.exports = ({ usersCollection }) => {

    const { ObjectId } = require('mongodb');
    
    const express = require('express');
    const router = express.Router();

    // ACCOUNT

    router.get('/', async (req, res) => {
        const user = req.session.user;
    
        if (user) {
            const userData = await usersCollection.findOne({ _id: new ObjectId(user._id) });

            res.render('account', {
                userData
            });
        } else {
            res.render('login');
        }
    });

    return router;

}
