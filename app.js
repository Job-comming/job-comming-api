const express = require('express');
const app = express();
require('dotenv').config();

const db = require("./src/db/models");
// sequelize.sync();

const apiUser = require("./api/user")
const apiPost = require("./api/post")

apiUser(app, db)

const port = 3000
app.get('/', (req, res) => res.send('Hello World!~'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app
