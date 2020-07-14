module.exports = (app, models) => {
    app.get('/posts', (req, res) => {
        models.Posts.findAll().then((result) => res.json(result))
    })
}