// invoke 3rd party lib
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment');
const PORT = 5000

// create app instance
const app = express()
moment().format()
app.use(bodyParser.json())
app.use(cors())

// listening: port 5000
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

// userinfo db
const userinfo = [
    {
        id: 0,
        username: 'admin',
        password: 'admin',
    },
]

// userdata db
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

// resolve login info
app.get('/api/users', (req, res) => {
    res.status(200).send(userinfo)
})

// resolve login submit
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

// resolve login create + verify
app.post('/api/create', (req, res) => {
    const length = userinfo.length
    const name = req.body.username
    const password = req.body.password
    let validUser = userinfo.find(user => {
        if(user.username === name) {
            return user
        }
    })
    if(validUser) {
        res.status(400).send({ valid: false, info: `Server: user already exists::${req.body.username}` })
    } else {
        const user = {
            id: length,
            username: name,
            password: password
        }
        userinfo.push(user)
        const newLength = userinfo.length
        if ((newLength - length) === 1) {
            res.status(200).send({ valid: true, info: 'Server: add user successfully' })
        } else {
            res.status(400).send({ valid: false, info: `Server: failed to add user ${req.body.username}` })
        }
    }
})

// resolve login change password (need password verification)
app.post('/api/change', (req, res) => {
    let validUser = userinfo.find(user => {
        if (user.username === req.body.username) {
            user.password = req.body.password
            return user
        }
    })
    if (validUser) {
        res.status(200).send({ valid: true, info: 'Server: password changed' })
    } else {
        res.status(400).send({ valid: false, info: `Server: password failed to change, no user ${req.body.username}` })
    }
})

// resolve get all userdata
app.get(`/api/userdata/gets`, (req, res) => {
    res.status(200).send(userdata)
})

// resolve get userdata
app.get(`/api/userdata/get/:id`, (req, res) => {
    let validUserData = userdata.find(user => {
        if (parseInt(req.params.id) === user.id) {
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
app.post(`/api/userdata/add/:id`, (req, res) => {
    let validUserData = userdata.find(user => {
        if (parseInt(req.params.id) === user.id) {
            return user
        }
    })
    if(validUserData) {
        const newData = {
            dataId : validUserData.data.length,
            dataContent : {
                updatetime : moment(),
                content : req.body.data[0].dataContent.content,
                importance : req.body.data[0].dataContent.importance,
            }
        }
        validUserData.data.push(newData)
        res.status(200).send({ valid : true, method : '/api/userdata/add'})
    } else {
        res.status(400).send({ valid : false, method : '/api/userdata/add'})
    }
})

// resolve change userdata
app.post(`/api/userdata/change/:id`, (req, res) => {
    const userId = parseInt(req.params.id)
    const userIndex = userdata.find(user => user.id === userId)
    if(userIndex !== -1) {
        const dataIndex = userIndex.data.findIndex(element => element.dataId === req.body.data.dataId)
        if(dataIndex !== -1) {
            const dataContent = userIndex.data[dataIndex].dataContent
            dataContent.updatetime = moment()
            dataContent.content = req.body.data.dataContent.content
            dataContent.importance = req.body.data.dataContent.importance
            res.status(200).send({ valid: true, method: '/api/userdata/change' })
        } else {
            res.status(400).send({ valid: false, method: '/api/userdata/change', message: 'Data not found' })
        }
    } else {
        res.status(400).send({ valid: false, method: '/api/userdata/remove', message: 'User not found' })
    }
})

// resolve remove userdata
app.post(`/api/userdata/remove/:id`, (req, res) => {
    const userId = parseInt(req.params.id)
    const userIndex = userdata.find(user => user.id === userId)
    if(userIndex !== -1) {
        const dataIndex = userIndex.data.findIndex(element => element.dataId === req.body.data.dataId)
        if(dataIndex !== -1) {
            userIndex.data.splice(dataIndex, 1)
            userIndex.data.forEach((element, index) => {
                element.dataId = index
            })
            res.status(200).send({ valid: true, method: '/api/userdata/remove' })
        } else {
            res.status(400).send({ valid: false, method: '/api/userdata/remove', message: 'Data not found' })
        }
    } else {
        res.status(400).send({ valid: false, method: '/api/userdata/remove', message: 'User not found' })
    }
})