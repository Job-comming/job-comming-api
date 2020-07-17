import { Router } from 'express'
import passport, { Passport } from 'passport'
import { UserModel } from '../models'
import {
  strategy as googleStrategy,
  createRouter as createGoogleRouter,
} from './google.passport'

export const initializePassport = () => {
  const passport = new Passport()

  passport.serializeUser<UserModel, number>((user, callback) => {
    callback(null, user.id)
  })

  passport.deserializeUser<UserModel | null, number>(async (id, callback) => {
    try {
      const user = await UserModel.findOne({
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
