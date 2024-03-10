// invoke 3rd party lib
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment');
const PORT = 5000

// create instance
const app = express()
moment().format()
app.use(bodyParser.json())
app.use(cors())

// listening: port 5000
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

// userinfo
const userinfo = [
    {
        id: 0,
        username: 'admin',
        password: 'admin',
    },
]

// userdata
const userdata = [
    {
        id: 0,
        data: [
            {
                dataId: 0,
                dataContent: {
                    updatetime: moment(),
                    content: 'Finish web development homework!',
                    importance: 'very important!'
                }
            },
        ]
    },
]

app.get('/api/users', (req, res) => {
    res.status(200).send(userinfo)
})

// resolve submit
app.post('/api/submit', (req, res) => {
    let validUser = userinfo.find(user => {
        if (user.username === req.body.username && user.password === req.body.password) {
            return user
        }
    })
    // send only one response
    if (validUser) {
        res.status(200).send({ valid: true, info: { username: req.body.username, password: req.body.password } })
    } else {
        res.status(400).send({ valid: false, method : '/api/submit' })
    }
})

// resolve create
app.post('/api/create', (req, res) => {
    const length = userinfo.length
    const user = {
        id: length,
        username: req.body.username,
        password: req.body.password
    }
    userinfo.push(user)
    const newLength = userinfo.length
    if ((newLength - length) === 1) {
        res.status(200).send({ valid: true, info: 'Server: add user successfully' })
    } else {
        res.status(400).send({ valid: false, info: `Server: failed to add user ${req.body.username}` })
    }
})

// resolve change (*need modify)
app.post('/api/change', (req, res) => {
    let changeFlag = false
    userinfo.find(user => {
        if (user.username === req.body.username) {
            user.password = req.body.password
            res.status(200).send({ valid: true, info: 'Server: password changed' })
        }
    })
    if (!changeFlag) {
        res.status(400).send({ valid: false, info: `Server: password failed to change, no user ${req.body.username}` })
    }
})

// resolve userdata
app.get(`/api/userdata/get`, (req, res) => {
    let validUserData = userdata.find(user => {
        if (req.body.id === user.id) {
            return user
        }
    })
    if (validUserData) {
        res.status(200).send(validUserData)
    } else {
        res.status(400).send({ valid: false, method : '/api/userdata/get'})
    }
})

// resolve add userdata
app.post(`/api/userdata/add`, (req, res) => {
    let validUserData = userdata.find(user => {
        if (req.body.id === user.id) {
            return user
        }
    })
    if(validUserData) {
        const newData = {
            dataId : userdata.data.length + 1,
            dataContent : {
                updatetime : moment(),
                content: req.body.data.dataContent.content,
                importance: req.body.data.dataContent.importance,
            }
        }
        validUserData.data.push(newData)
        res.status(200).send({ valid : true, method : '/api/userdata/add'})
    } else {
        res.status(400).send({ valid : false, method : '/api/userdata/add'})
    }
})

// resolve change userdata
app.post(`/api/userdata/change`, (req, res) => {
    let validUserData = userdata.find(user => {
        if (req.body.id === user.id) {
            user.data.find(data => {
                if(req.body.data.dataId === data.dataId) {
                    return data
                }
            })
        }
    })
    if(validUserData) {
        validUserData.dataContent = req.body.data.dataContent
        res.status(200).send({ valid : true, method : '/api/userdata/change'})
    } else {
        res.status(400).send({ valid : false, method : '/api/userdata/change'})
    }
})

// resolve remove userdata
app.post(`/api/userdata/remove`, (req, res) => {
    let validUserData = userdata.find(user => {
        if(req.body.id === user.id) {
            user.data.find(data => {
                if(data.dataId === req.body.data.dataId) {
                    user.data.splice(data)
                    return user.data
                }
            })
        }
    })
    if(validUserData) {
        res.status(200).send({ valid : true , method : '/api/userdata/remove'})
    } else {
        res.status(400).send({ valid : false , method : '/api/userdata/remove'})
    }
})