const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors)
const PORT = 5000
const database = [
    {
        id: 1,
        username: 'Admin',
        password: 'Admin',
    },
]

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.post('/api/users', (req, res) => {
    const { username, password } = req.body
    const user = {
        id: database.length + 1,
        username : username,
        password : password,
    }
    database.push(user)
    res.json(user)
})

app.get('/api/users/check', (req, res) => {
    const { username, password } = req.body
    database.forEach((user) => {
        if (user.username === username && user.password === password) {
            // verify user
            res.send(true, user)
        }
    })
    res.send(false)
})