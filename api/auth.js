const express = require('express');
const passport = require('passport');

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // 회원가입용 세션을 생성하고 그 세션의 토큰을 클라이언트한테 보내주면되요
        console.log(req.user);
        req.session['user'] = req.user;
        res.json({ 'accessToken': req.user.accessToken, 'user': req.user.user });
    }
)
app.get('/debug', (req, res) => {
    res.json({
        'req.session': req.session, // 세션 데이터
        'req.user': req.user, // 유저 데이터(뒷 부분에서 설명)
        'req._passport': req._passport, // 패스포트 데이터(뒷 부분에서 설명)
    })
});