const { Pool } = require('pg')

const pool = new Pool({
    database: 'taskman', 
    user: 'liam', 
    password: 'password'
})

module.exports = pool;