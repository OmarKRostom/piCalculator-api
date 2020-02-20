import express from 'express'
import router from './routes/appRouter'

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
 * App port listening
 */
appInstance.listen(3000)

module.exports = appInstance