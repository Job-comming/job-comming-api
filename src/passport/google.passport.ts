import express from 'express'
import get from 'lodash/get'
import passport from 'passport'
import {
  Strategy as GoogleStrategy, VerifyCallback
} from 'passport-google-oauth20'