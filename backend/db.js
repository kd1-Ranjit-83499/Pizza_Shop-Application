const mysql = require ('mysql2/promise')

// create connection pool. the pool specific settings are the defaults
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'pizza_shop',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,    // max idle connections, the default value is the same as 'connectionLimit'
    idleTimeout: 6000,    // idle connections timeout, in milliseconds, the default value is 6000
    queueLimit:0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})

module.exports = pool 