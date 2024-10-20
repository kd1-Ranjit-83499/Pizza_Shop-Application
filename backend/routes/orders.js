const express = require('express')
const router  = express.Router()
const db = require('../db')
const utils = require('../utils')


// To get the orders

router.get('/', async (request, response) => {
    try {
        const statement = `SELECT id, totalAmount, createdTimestamp 
        FROM orderMaster WHERE userId = ?`
        const [orders] = await db.execute(statement, [request.data.id])
        response.send(utils.createSuccess(orders))
    } catch (ex) {
        response.send(utils.createError(ex))
    }
})


// To get the order details

router.get('/details/:id', async (request, response) => {
    const {id} = request.params
    try {
        const statement = `SELECT pizza.name, pizza.details, pizza.price, pizzaId, quantity, totalAmount, orderDetails.createdTimestamp 
        FROM orderDetails, pizza WHERE orderId = ? AND pizza.id = orderDetails.pizzaId`

        const [details] = await db.execute(statement, [id])
        response.send(utils.createSuccess(details))
    } catch (ex) {
        response.send(utils.createError(ex))
    }
})


// Creation of the order

router.post('/', async (request, response) => {
    const {items, totalAmount} = request.body

    try {
        //Step :1 => Create an order
        const statementOrder = `INSERT INTO orderMaster (userId, totalAmount) values(?, ?)`
        const order = await db.execute(statementOrder, [request.data.id, totalAmount])

        //Step :2 => find the new orderId
        const orderId = order[0].insertId

        //Step :3 => Insert the order details
        for(const item of items){
            const statementOrderDetails = `INSERT INTO orderDetails (orderId, pizzaId, quantity, totalAmount) values(?, ?, ?, ?)`
            await db.execute(statementOrderDetails, [
                orderId,
                item['pizzaId'], 
                item['quantity'],
                item['totalAmount']             
            ])
        }
        response.send(utils.createSuccess('Done'))
    } catch (ex) {
        response.send(utils.createError(ex))
    }
})


module.exports = router