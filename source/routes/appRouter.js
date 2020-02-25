/**
 * Module constructor
 */
import express from 'express'
import * as piController from '../controllers/PiController'

let appRouter = express.Router()

/**
 * Define pi Calculator Routes
 */
appRouter.get('/pi', piController.getLatestPi)
appRouter.get('/pi/reset', piController.resetPi)

module.exports = appRouter