module.exports = (app, models) => {
    app.get('/users', (req, res) => {
        models.Users.findAll().then((result) => res.json(result))
    })
}