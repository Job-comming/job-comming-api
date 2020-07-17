import express, { Request } from 'express'
import get from 'lodash/get'
import passport from 'passport'
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
  Profile,
} from 'passport-google-oauth20'
import {
  API_BASE_URL,
  CLIENT_BASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../config'
import { NormalizedProfile, verifyCallback } from './base.passport'
import { Provider } from '../types'

type GoogleVerifyFunction = (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback,
) => void

const verifyFunction: GoogleVerifyFunction = (
  req,
  accessToken,
  refreshToken,
  profile,
  done,
) => {
  const normalizedProfile: NormalizedProfile = {
    serviceUserID: profile.id,
    username: profile.displayName,
    email: get(profile, '_json.email', ''),
  }

  return verifyCallback(
    req.context,
    accessToken,
    refreshToken,
    normalizedProfile,
    done,
    Provider.GOOGLE,
  )
}

export const strategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${API_BASE_URL}/auth/google/callback`,
    passReqToCallback: true,
  },
  verifyFunction,
)

export function createRouter(passport: passport.Authenticator) {
  const router = express.Router()

  router.get('/auth/google', (req, res, next) => {
    passport.authenticate('google', {
      scope: ['email', 'profile'],
    })(req, res, next)
  })

  router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
    }),
  )

  return router
}
