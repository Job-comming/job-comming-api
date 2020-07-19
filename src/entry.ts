import express from 'express'
import compression from 'compression'
import ehr from 'express-handle-rejection'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
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
import { getUserInfoFromSession } from './auth'
import { router } from './rest'
import { Context } from './context'
import { UserInfo } from './services/user-info.service'

declare module 'express' {
  export interface Request {
    user: UserInfo
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

  const app = express()

  app.use(compression())
  app.use(cookieParser())
  app.use(cookieParser())

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors({ origin: true, credentials: true }))

  const SessionStore = new MySQLStore(session)
  app.use(
    session({
      store: new SessionStore({
        host: MYSQL_HOST,
        user: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        port: MYSQL_PORT,
      }),
      secret: COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      },
    }),
  )

  const passport = initializePassport()
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(
    ehr(async (req, res, next) => {
      const userModel = await getUserInfoFromSession(req.session)

      // eslint-disable-next-line require-atomic-updates
      req.context = new Context(sequelize, req, res, userModel)
      next()
    }),
  )

  app.use(router)
  app.use(createPassportRouter(passport))

  app.listen(PORT, () => {
    console.log(`\n😻 Listening at http://localhost:${PORT}\n`)
  })
}

init()
