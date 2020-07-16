import {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} from './config'

const config = {
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true,
  },
}

module.exports = {
  development: config,
  production: config,
}
