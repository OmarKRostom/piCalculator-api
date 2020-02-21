import dbClient from '../db/dbClient'

const piCollection = "piCollection"
const localPi = {
    _id: 1,
    value: 3,
    decimalPoint: 1
}

/**
 * Call this function to retrieve latest Pi value
 * @param {*} req 
 * @param {*} res 
 */
export const getLatestPi = (req, res) => {
    dbClient
    .db(process.env.DB_NAME).collection(piCollection).find({
        _id: 1
    }).toArray((err, result) => {
        //Since the query is .toArray, access the first Item
        if (result == null || result[0] == null) {
            //Create the first value of Pi            
            res.json(localPi)
            //Update api with first value of PI
            updatePi(localPi)
        } else {
            res.json(result[0])
            //Update api with first value of PI
            updatePi(result[0])
        }
    })
}

/**
 * Use this function to update Pi value
 * @param {*} pi 
 */
export const updatePi = (pi = null) => {
    pi = calcaulatePi(pi)
    dbClient.db(process.env.DB_NAME).collection(piCollection).replaceOne({_id: 1}, pi, (err, result) => {
        console.log("Pi value update successfully: ", pi)
    }, { upsert: true })
}

/**
 * Use this function to reset Pi value to starting one (3)
 */
export const resetPi = (req, res) => {
    dbClient.db(process.env.DB_NAME).collection(piCollection).replaceOne({_id: 1}, localPi, (err, result) => {
        if (err) {
            res.status = 500
            res.send({
                'status': 'failure',
                'err': err
            })
            return
        }

        res.send({
            'status': 'success'
        })
    }, { upsert: true })
}

/**
 * Increase pi accuracy by calling this function
 * @param {*} lastPi 
 */
const calcaulatePi = (lastPi) => {
    lastPi.value = parseFloat(Math.PI.toFixed(lastPi.decimalPoint++))
    return lastPi
}