const express = require('express')
const mysql = require('mysql')
const router = express.Router()

function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        database: 'restapi_nodejs',
        user: 'root',
        password: '',
    })
}

router.get('/users', (req, res) => {
    const connection = getConnection()

    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err, result, fields) => {
        if (err) {
            console.log('Query failed list user: ' + err)
            res.end()
            return
        }
        res.json(result)
        res.end()
    })
})

router.get('/user/:id', (req, res) => {
    const connection = getConnection()

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?";
    connection.query(queryString, [userId], (err, result, fields) => {
        if (err) {
            console.log('Query failed user with id: ' + err)
            res.end()
            return
        }
        res.json(result)
        res.end()
    })
})

router.post('/user', (req, res) => {
    const firstName = req.body.first_name
    const lastName = req.body.last_name
    const age = req.body.age

    const connection = getConnection()
    
    const queryString = "INSERT INTO users(first_name, last_name, age) VALUES (?, ?, ?)"
    connection.query(queryString, [firstName, lastName, age], (err, result, fields) => {
        if (err) {
            console.log('Error insert user: ' + err);
            res.sendStatus(500)
            res.end()
            return
        }
        res.send({
            id: result.insertId,
            firstName: firstName,
            lastName: lastName,
            age: age 
        })
    })
})

module.exports = router