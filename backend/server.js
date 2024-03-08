// invoke 3rd party lib
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 5000

// create instance
const app = express()
app.use(bodyParser.json())
app.use(cors())

// listening: port 5000
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

// storage
const userinfo = [
    {   
        id : 0,
        username : 'admin',
        password : 'admin',
    },
]

app.get('/api/users', (req, res) => {
    res.status(200).send(userinfo)
})

// resolve submit
app.post('/api/submit', (req, res) => {
    let validFlag = false
    userinfo.find(user => {
        if(user.username === req.body.username && user.password === req.body.password) {
            res.send({ valid : true, info : { username : req.body.username, password : req.body.password}})
        }
    })
    if(!validFlag) {
        res.send({ valid : true, info : 'incorrect userinfo'})
    }
})

// resolve create
app.post('/api/create', (req, res) => {
    const length = userinfo.length
    const user = {
        id : length,
        username : req.body.username,
        password : req.body.password
    }
    userinfo.push(user)
    const newLength = userinfo.length
    if((newLength - length) === 1) {
        res.status(200).send({ valid : true, info : 'Server: add user successfully' })
    } else {
        res.status(400).send({ valid : false, info : `Server: failed to add user ${req.body.username}`})
    }
})

// resolve change
app.post('/api/change', (req, res) => {
    let changeFlag = false
    userinfo.find(user => {
        if(user.username === req.body.username) {
            user.password = req.body.password
            res.status(200).send({ valid : true, info : 'Server: password changed' })
        }
    })
    if(!changeFlag) {
        res.status(400).send({ valid : false, info : `Server: password failed to change, no user ${req.body.username}` })
    }
})