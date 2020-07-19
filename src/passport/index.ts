import { Router } from 'express'
import passport, { Passport } from 'passport'
import { AuthUserModel } from '../models'
import {
  strategy as googleStrategy,
  createRouter as createGoogleRouter,
} from './google.passport'

export const initializePassport = () => {
  const passport = new Passport()

  passport.serializeUser<AuthUserModel, number>((user, callback) => {
    callback(null, user.id)
  })

  passport.deserializeUser<AuthUserModel | null, number>(async (id, callback) => {
    try {
      const user = await AuthUserModel.findOne({
        where: { id },
      })
      callback(null, user)
    } catch (error) {
      callback(error)
    }
  })

  passport.use('google', googleStrategy)

  return passport
}

export const createPassportRouter = (passport: passport.Authenticator) => {
  const router = Router()

  const googleRouter = createGoogleRouter(passport)
  router.use(googleRouter)

  return router
}
