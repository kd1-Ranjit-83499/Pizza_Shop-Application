const express = require ('express')
const cors = require('cors')
const morgan = require('morgan')   // used for login purpose
const jwt = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')

// Create React App

const app = express()
app.use(cors())     // without cors we won't be able to use this application outside ur local machine
app.use(morgan('combined'))    // combined- you get all the details to see whats going on
app.use(express.json())     // for the json body
app.use(express.urlencoded({extended: true}))
app.use(express.static('images'))

// Token protected routes
app.use((request, response, next) => {
    const skipUrls = ['/user/signup', '/user/signin']
    if (skipUrls.findIndex((item) => item == request.url) != -1) {
        next()
    } else {
        const token = request.headers['token']
        if (!token) {
            response.send(utils.createError('missing token'))
        } else {
            try {
                const payload = jwt.verify(token, config.secret)
                request.data = payload
                next() 
            } catch (ex) {
                response.send(utils.createError('invalid token'))
            }
        }
    }
})


// Add the Routes
const userRouter = require('./routes/users')
const pizzaRouter = require('./routes/pizza')
const orderRouter = require('./routes/orders')

app.use('/user', userRouter)
app.use('/pizza', pizzaRouter)
app.use('/order', orderRouter)

app.listen(4000, '0.0.0.0', () => {
    console.log("Server started on port 4000")
})