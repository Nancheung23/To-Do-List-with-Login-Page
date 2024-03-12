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
        // initailize
        response.data.forEach(async element => {
            let index = response.data.indexOf(element)
            const dataBlock = document.createElement('div')
            const updateTime = moment(element.dataContent.updateTime)
            let content = element.dataContent.content
            let importance = element.dataContent.importance
            dataBlock.innerHTML = `
            <span> ${updateTime} </span>
            <span id='content'> ${content} </span>
            <span id='importance'> ${importance} </span> 
            `
            // add buttons
            const methodsArea = document.createElement('div')
            // remove button
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
            try {
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
            } catch (error) {
                console.log(error)
            }
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
            try {
                modifyBtn.addEventListener('click', async (e) => {
                    e.preventDefault()
                    // modify content
                    const contentElement = document.getElementById('content')
                    contentElement.innerHTML = `
                    <input id="contentValue_${index}" type="text" placeholder="${content}"/>
                    `
                    // modify importance
                    const importanceElement = document.getElementById('importance')
                    importanceElement.innerHTML = `
                    <select name="levels" id='levelSelect_${index}'>
                        <option value="">--Choose Importance--</option>
                        <option value="Very Important">Very Important</option>
                        <option value="Important">Important</option>
                        <option value="Normal">Normal</option>
                        <option value="Not Important">Not Important</option>
                    </select>
                    <input id ="submitChange_${index}" type="button" name="submit" value="confirm"/>
                    `
                    const submitBtn = document.getElementById(`submitChange_${index}`)
                    submitBtn.addEventListener('click', async (e) => {
                        e.preventDefault()
                        let changeInfo = {
                            id: info.id,
                            data: {
                                dataId: index,
                                dataContent: {
                                    "content": document.getElementById(`contentValue_${index}`).value,
                                    "importance": document.getElementById(`levelSelect_${index}`).value
                                }
                            }
                        }
                        const response = await fetchChangeUserInfo(changeInfo)
                        if (response.valid === true) {
                            const data = await fetchGetUserInfo(info)
                            contentElement.innerHTML = `<span id='content'> ${data.data[index].dataContent.content} </span>`
                            importanceElement.innerHTML = `<span id='importance'> ${data.data[index].dataContent.importance} </span>`
                        }
                    })

                })
            } catch (error) {
                console.log(error)
            }
            // append to dataBlock
            methodsArea.appendChild(labelModify)
            methodsArea.appendChild(modifyBtn)
            methodsArea.appendChild(labelRemove)
            methodsArea.appendChild(removeBtn)
            dataBlock.appendChild(methodsArea)
            // append to container
            container.appendChild(dataBlock)
        })
    } catch (error) {
        console.log(error)
    }
}

// add new userinfo to webpage
const addInDataList = async (info) => {
    try {
        const container = document.getElementById('container')
        const addArea = document.createElement('div')
        addArea.innerHTML = `
        <input id="addBtn" type="button" name="addElement" value="Add"/>
        `
        container.appendChild(addArea)
        const addBtn = document.getElementById('addBtn')
        try {
            addBtn.addEventListener('click', async () => {
                const dataBlock = document.createElement('div')
                dataBlock.innerHTML = `
                <input id="contentValue" type="text" placeholder="write description"/>
                <select name="levels" id='levelSelect'>
                    <option value="">--Choose Importance--</option>
                    <option value="Very Important">Very Important</option>
                    <option value="Important">Important</option>
                    <option value="Normal">Normal</option>
                    <option value="Not Important">Not Important</option>
                </select>
                <input id ="submitChange" type="button" name="submit" value="confirm"/>
                `
                container.appendChild(dataBlock)
                const submitBtn = document.getElementById('submitChange')
                submitBtn.addEventListener('click', async(e) => {
                    e.preventDefault()
                    const contentValue = document.getElementById('contentValue').value
                    const importanceValue = document.getElementById('levelSelect').value
                    const response = await fetchAddUserData({
                        id : info.id,
                        data : [{
                            dataContent : {
                                content : contentValue,
                                importance : importanceValue,
                            }
                        }]
                    })
                    if(response.valid === true) {
                        const data = await fetchGetUserInfo(info)
                        const element = data.data[data.data.length-1]
                        const updateTime = moment(element.dataContent.updateTime)
                        let content = element.dataContent.content
                        let importance = element.dataContent.importance
                        dataBlock.innerHTML = `
                        <span> ${updateTime} </span>
                        <span id='content'> ${content} </span>
                        <span id='importance'> ${importance} </span> 
                        `
                    }
                })
            })
        } catch (error) {
            
        }
    } catch (error) {
        console.log(error)
    }
}

addInDataList(getInfo)
getDataList(getInfo)