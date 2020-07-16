const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Auths = require('./auth')(sequelize, Sequelize);
db.Mentorings = require('./mentoring')(sequelize, Sequelize);
db.Posts = require('./post')(sequelize, Sequelize);
db.Reviews = require('./review')(sequelize, Sequelize);
db.Users = require('./user')(sequelize, Sequelize);
db.UserCategories = require('./usercategory')(sequelize, Sequelize);

module.exports = db
