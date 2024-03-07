const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = 5000
const database = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
    },
]

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.post('/createUser', (req, res) => {
    const user = {
        id: database.length + 1,
        username: req.body.username,
        password: req.body.password,
    }
    console.log(user)
    database.push(user)
    res.json(user)
})

app.post('/submit', (req, res) => {
    let flag = false
    database.find((user) => {
        if (user.username === req.body.username && user.password === req.body.password) {
            console.log({ username: req.body.username, password: req.body.password, valid: true })
            res.send({ valid: true, info : 'pass' })
            flag = true
        }
    })
    if(flag === false) {
        res.send({ valid: false, info : 'fail' })
    }
})

app.get('/users', (req, res) => {
    res.send(database)
})