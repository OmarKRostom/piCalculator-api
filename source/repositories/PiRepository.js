import dbClient from '../db/dbClient'
import regeneratorRuntime from "regenerator-runtime";

const piCollection = "piCollection"
const localPi = {
    _id: 1,
    value: 3,
    multiplier: 1,
    leastDenimenator: 2,
    decimalPoint: 1
}

/**
 * Call this function to retrieve latest Pi value
 */
export const getLatestPi = () => {
    let promiseRes = new Promise((resolve, reject) => {
        dbClient.db(process.env.DB_NAME).collection(piCollection).find({
            _id: 1
        }).toArray((err, result) => {
            if (err) reject(err)

            if (!result[0]) resolve(localPi)
            else resolve(result[0])
        })
    })

    return promiseRes
}

/**
 * Use this function to update Pi value
 * @param {*} pi 
 */
export const updatePi = (pi = null) => {
    let promiseRes = new Promise((resolve, reject) => {
        dbClient.db(process.env.DB_NAME).collection(piCollection).replaceOne({_id: 1}, pi, (err, result) => {
            if (err) {
                reject({
                    'status': 'failure',
                    'err': err
                })
                return
            }
    
            resolve(result)
        }, { upsert: true })
    })
    
    return promiseRes
}

/**
 * Use this function to reset Pi value to starting one (3)
 */
export const resetPi = async () => {
    let promiseRes = new Promise((resolve, reject) => {
        dbClient.db(process.env.DB_NAME).collection(piCollection).replaceOne({_id: 1}, localPi, (err, result) => {
            if (err) {
                reject({
                    'status': 'failure',
                    'err': err
                })
                return
            }
            
            resolve(result)
        }, { upsert: true })
    })

    return promiseRes
}