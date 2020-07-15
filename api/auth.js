module.exports = (app, passport) => {
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/loginFailure' }),
        (req, res) => {
            // 회원가입용 세션을 생성하고 그 세션의 토큰을 클라이언트한테 보내주면되요
            console.log(req.user);
            req.session['user'] = req.user;
            res.json({ 'accessToken': req.user.accessToken, 'user': req.user.user });
        }
    )
    app.get('/debug', (req, res) => {
        res.json({
            'req.session': req.session,
            'req.user': req.user,
            'req._passport': req._passport
        })
    });
}

// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const { Auths } = require("../src/db/models");

// router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
// router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/loginFailure' }),
//     (req, res) => {
//         // 회원가입용 세션을 생성하고 그 세션의 토큰을 클라이언트한테 보내주면되요
//         console.log(req.user);
//         req.session['user'] = req.user;
//         res.json({ 'accessToken': req.user.accessToken, 'user': req.user.user });
//     }
// )
// router.get('/debug', (req, res) => {
//     res.json({
//         'req.session': req.session,
//         'req.user': req.user,
//         'req._passport': req._passport
//     })
// });

// module.exports = router;