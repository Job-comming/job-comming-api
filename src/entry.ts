import express from 'express'
import ehr from 'express-handle-rejection'
import cors from 'cors'
import {
  PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_PORT,
} from './config'
import { init as initModels } from './models'
import { router } from './rest'
import { Context } from './context'

async function init() {
  const sequelize = await initModels({
    dialect: 'mysql',
    username: MYSQL_USERNAME,
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    logging: false,
  })

  const middleware = ehr(async (req, res, next) => {
    // eslint-disable-next-line require-atomic-updates
    req.context = new Context(sequelize)
    next()
  })

  const app = express()
  app.use(middleware)
  app.use(cors({ origin: true, credentials: true }))
  app.use(router)

  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
  })
}

init()
