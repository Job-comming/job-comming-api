const express = require('express')
const app = express()
const port = 3000

const sequelize = require('./models/index').sequelize
sequelize.sync()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
)

// router
app.use('/api/user', require('./router/user').user)
app.use('/api/post', require('./router/post').post)

module.exports = app
