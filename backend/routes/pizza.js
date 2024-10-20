const express = require('express')
const router  = express.Router()
const db = require('../db')
const utils = require('../utils')

router.get('/', async (request, response) => {
    try {
        const statement = `select id, name, details, price, image from pizza`
        const [result] = await db.execute(statement, [])
        response.send(utils.createSuccess(result))

    } catch (ex) {
        response.send(utils.createError(ex))
    }
})

module.exports = router