import express from 'express'
import ehr from 'express-handle-rejection'
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import MySQLStore from 'express-mysql-session'
import { initializePassport, createPassportRouter } from './passport'
import {
  PORT,
  DOMAIN,
  COOKIE_SECRET,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_PORT,
} from './config'
import { init as initModels } from './models'
import { getUserFromSession } from './auth'
import { router } from './rest'
import { Context } from './context'
import { User } from './services/user.service'

declare module 'express' {
  export interface Request {
    user: User
  }
}

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

  const SessionStore = new MySQLStore(session)
  const MySQLOption = {
    host: MYSQL_HOST,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT,
  }

  const passport = initializePassport()
  const passportRouter = createPassportRouter(passport)

  const middleware = ehr(async (req, res, next) => {
    const userModel = await getUserFromSession(req.session)

    // eslint-disable-next-line require-atomic-updates
    req.context = new Context(sequelize, req, res, userModel)
    next()
  })

  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(
    session({
      store: new SessionStore(MySQLOption),
      secret: COOKIE_SECRET,
      resave: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        domain: DOMAIN,
      },
      saveUninitialized: false,
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(passportRouter)

  app.use(middleware)
  app.use(cors({ origin: true, credentials: true }))
  app.use(router)

  app.listen(PORT, () => {
    console.log(`\n😻Listening at http://localhost:${PORT}\n`)
  })
}

init()
