import { Router } from 'express'
import * as ctrl from './controllers'

export const router = Router()

router.get('/', ctrl.rootGet)
router.get('/feeds', ctrl.getFeeds)
