// fetch userinfo from server
const fetchGetUserInfo = async (info) => {
    try {
        const response = await fetch(`http://localhost:5000/api/userdata/get/${info.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

// input type for 'get'
const getInfo = {
    id: 0,
}

// add userdata
const fetchAddUserData = async (info) => {
    try {
        const response = await fetch(`http://localhost:5000/api/userdata/add/${info.id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(info)
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

// input type for 'add'
const addInfo = {
    id : 0,
    data : [
        {
            "dataContent": {
                "content": "add new content for user 0",
                "importance": "important",
            }
        }
    ]
}

const fetchRemoveUserData = async (info) => {
    try {
        const response = await fetch(`http://localhost:5000/api/userdata/remove/${info.id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(info)
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

// input type for 'remove'
const removeInfo = {
    id : 0,
    data : {
        dataId : 0,
    },
}

const fetchChangeUserInfo = async (info) => {
    try {
        const response = await fetch(`http://localhost:5000/api/userdata/change/${info.id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(info)
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

// input type for 'change'
const changeInfo = {
    id : 0,
    data : {
        dataId : 0,
        dataContent : {
            "content": "after change",
            "importance": "normal"
        }
    }
}

// console.log(fetchGetUserInfo(getInfo))
// console.log(fetchRemoveUserData(removeInfo))
// console.log(fetchAddUserData(addInfo))
// console.log(fetchChangeUserInfo(changeInfo))

// load userinfo to webpage
const getDataList = async(info) => {
    try {
        const container = document.getElementById('container')
        const response = await fetchGetUserInfo(info)
        response.data.forEach(element => {
            const dataBlock = document.createElement('div')
            const updateTime = moment(element.dataContent.updateTime)
            const content = element.dataContent.content
            const importance = element.dataContent.importance
            dataBlock.innerHTML = `
                <span> ${updateTime} </span>
                <span> ${content} </span>
                <span> ${importance} </span>
            `
            container.appendChild(dataBlock)
        });
    } catch (error) {
        console.log(error)
    }
}

// getDataList(getInfo)