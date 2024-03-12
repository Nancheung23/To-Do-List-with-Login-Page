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
    id: 0,
    data: [
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
    id: 0,
    data: {
        dataId: 1,
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
    id: 0,
    data: {
        dataId: 0,
        dataContent: {
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
const getDataList = async (info) => {
    try {
        const container = document.getElementById('container')
        const response = await fetchGetUserInfo(info)
        response.data.forEach(async element => {
            let index = response.data.indexOf(element)
            const dataBlock = document.createElement('div')
            const updateTime = moment(element.dataContent.updateTime)
            let content = element.dataContent.content
            let importance = element.dataContent.importance
            dataBlock.innerHTML = `
            <form action='' method='post'>
                <span> ${updateTime} </span>
                <span id='content'> ${content} </span>
                <span id='importance'> ${importance} </span>
            </form>    
            `
            // add buttons
            const methodsArea = document.createElement('div')
            // remove
            const labelRemove = document.createElement('label')
            labelRemove.innerHTML = `
                <span>delete item</span>
            `
            labelRemove.for = `remove_${index}`
            const removeBtn = document.createElement('input')
            removeBtn.id = `remove_${index}`
            removeBtn.name = 'remove'
            removeBtn.type = 'button'
            removeBtn.value = 'remove'
            removeBtn.addEventListener('click', async () => {
                const response = await fetchRemoveUserData({
                    id: 0,
                    data: {
                        dataId: index,
                    }
                })
                if (response.valid === true) {
                    dataBlock.innerHTML = ''
                }
            })
            // change
            const labelModify = document.createElement('label')
            labelModify.innerHTML = `
            <span>modify item</span>
            `
            labelModify.for = `modify_${index}`
            const modifyBtn = document.createElement('input')
            modifyBtn.id = `modify_${index}`
            modifyBtn.name = 'modify'
            modifyBtn.type = 'button'
            modifyBtn.value = 'modify'
            modifyBtn.addEventListener('click', async (e) => {
                e.preventDefault()
                const contentElement = document.getElementById('content')
                contentElement.innerHTML = `
                <input id="contentValue" type="text" placeholder="${content}">
                <input id="submitChange" type="button" name="submit" value="confirm">
                `
                const submitBtn = document.getElementById('submitChange')
                submitBtn.addEventListener('click', async (e) => {
                    e.preventDefault()
                    let changeInfo = {
                        id: 0,
                        data: {
                            dataId: index,
                            dataContent: {
                                "content": document.getElementById('contentValue').value,
                                "importance": "normal"
                            }
                        }
                    }
                    const response = await fetchChangeUserInfo(changeInfo)
                    if(response.valid === true) {
                        const data = await fetchGetUserInfo(info)
                        contentElement.innerHTML = `<span id='content'> ${data.data[index].dataContent.content} </span>`
                    }
                })
            })

            methodsArea.appendChild(labelModify)
            methodsArea.appendChild(modifyBtn)
            methodsArea.appendChild(labelRemove)
            methodsArea.appendChild(removeBtn)
            dataBlock.appendChild(methodsArea)
            container.appendChild(dataBlock)
        })
    } catch (error) {
        console.log(error)
    }
}

getDataList(getInfo)