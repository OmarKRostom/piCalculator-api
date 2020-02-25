import cronScheduler from 'node-cron'
import * as piController from '../controllers/PiController'

/**
 * Cron job scheduled to run every minute to calculate a more accurate Pi
 */
export const schedulePiJob = () => {
    cronScheduler.schedule('* * * * *', () => {
        piController.updatePi()
    })
}