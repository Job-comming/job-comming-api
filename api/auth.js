// module.exports = (app, passport) => {

const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Users } = require("../src/db/models");

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/loginFailure' }),
    (req, res) => {
        res.redirect('/api/user/check');
    }
);
router.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/auth/google');
    } else {
        res.sendFile(__dirname + '/login.html');
    }
});
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return console.log(err);
        res.redirect('/login');
    })
})
router.get('/debug', (req, res) => {
    res.json({
        'id': req.sessionID,
        'req.session': req.session,
        'req.user': req.user,
        'req._passport': req._passport
    })
});

module.exports = router;
// }