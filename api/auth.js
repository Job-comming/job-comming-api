module.exports = (app, passport) => {
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/loginFailure' }),
        (req, res) => {
            req.session.user = req.user;
            req.session.save(() => {
                res.sendFile(__dirname + '/mypage.html');
                // res.json({ 'status': 'success', 'user': req.user.googleId });
            });
        }
    );
    app.get('/login', (req, res) => {
        if (req.session.user) {
            console.log(req.session.user);
            res.send('세션이 이미 존재합니다');
        } else {
            res.sendFile(__dirname + '/login.html');
        }
    });
    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) return console.log(err);
            res.redirect('/login');
        })
    })
    app.get('/debug', (req, res) => {
        res.json({
            'id': req.sessionID,
            'req.session': req.session,
            'req.user': req.user,
            'req._passport': req._passport
        })
    });
}