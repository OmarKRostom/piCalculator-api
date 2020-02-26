import * as piRepository from '../repositories/PiRepository'

export const getLatestPi = async (req, res) => {
    let piResult = piRepository.getLatestPi()

    piResult.then((result) => {
        res.send(result)
    }, err => {
        res.send({
            status: "Failure",
            code: 500,
            error: err
        })
    })
}

export const resetPi = async (req, res) => {
    let piResult = piRepository.resetPi()

    piResult.then((result) => {
        res.send(result)
    }, err => {
        res.send({
            status: "Failure",
            code: 500,
            error: err
        })
    })
}

/**
 * Update pi function that will be called by the cron job
 * @param {*} req 
 * @param {*} res 
 */
export const updatePi = async () => {
    let latestPiResult = piRepository.getLatestPi()

    latestPiResult.then(async (result) => {
        let updatePiRequest = piRepository.updatePi(calcaulatePi(result))

        updatePiRequest.then((resultPiUpdate) => {
            console.log(resultPiUpdate)
        }, errPiUpdate => {
            console.log({
                status: "Failure",
                code: 500,
                error: errPiUpdate
            })
        })
    }, err => {
        console.log({
            status: "Failure",
            code: 500,
            error: err
        })
    })
}

/**
 * Increase pi accuracy by calling this function
 * Implementing Nilakantha series forumla
 * @param {*} lastPi 
 */
export const calcaulatePi = (lastPi) => {
    lastPi.value += parseFloat(((lastPi.multiplier) * (4/(lastPi.leastDenimenator * (lastPi.leastDenimenator + 1) * (lastPi.leastDenimenator + 2)))))
    lastPi.value = parseFloat(lastPi.value.toFixed((lastPi.decimalPoint == 20) ? lastPi.decimalPoint : ++lastPi.decimalPoint))
    lastPi.multiplier *= -1
    lastPi.leastDenimenator += 2
    return lastPi
}