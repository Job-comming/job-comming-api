import express from 'express'
import passport, { Passport } from 'passport'
import { UserModel } from '../models'
// import { strategy as googleStrategy } from './google.passport'

export function initializePassport() {
  const passport = new Passport()
}