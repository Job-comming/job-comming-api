require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": "database_development",
    "host": "127.0.0.1",
    "port": process.env.DB_PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.TEST_USER,
    "password": process.env.TEST_PASSWORD,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.PROD_USER,
    "password": process.env.PROD_PASSWORD,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}