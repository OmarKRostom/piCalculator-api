import express from 'express'
import router from './routes/appRouter'
import * as piScheduler from './schedulers/piScheduler'

/**
 * Initialization
 */
const appInstance = express()

/**
 * App router
 */
appInstance.use(express.static("public"))
appInstance.use(router)

/**
 * App schedulers
 */
piScheduler.schedulePiJob()

/**
 * App port listening
 */
appInstance.listen(3000)

module.exports = appInstance