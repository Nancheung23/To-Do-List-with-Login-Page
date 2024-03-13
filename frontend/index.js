// add / change / remove from server
const fetchUserInfo = async (info, method) => {
    try {
        const response = await fetch(`http://localhost:5000/api/userdata/${method}/${info.id}`, {
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

// get userinfo from server
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

// input example for 'get'
const getInfo = {
    id: 0,
}

// input example for 'add'
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

// input example for 'remove'
const removeInfo = {
    id: 0,
    data: {
        dataId: 1,
    },
}

// input example for 'change'
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


// set method area
const methodsAreaFunc = async (info, index, block) => {
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
            const response = await fetchUserInfo({
                id: info.id,
                data: {
                    dataId: index,
                }
            }, 'remove')
            if (response.valid === true) {
                block.remove()
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
        <input id="contentValue_${index}" type="text" placeholder="input new"/>
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
                const response = await fetchUserInfo(changeInfo, 'change')
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
    methodsArea.appendChild(labelModify)
    methodsArea.appendChild(modifyBtn)
    methodsArea.appendChild(labelRemove)
    methodsArea.appendChild(removeBtn)
    block.appendChild(methodsArea)
}

// load userinfo to webpage
const getDataList = async (info) => {
    try {
        const container = document.getElementById('container')
        const response = await fetchGetUserInfo(info)
        // initailize
        response.data.forEach(async element => {
            let index = response.data.indexOf(element)
            const dataBlock = document.createElement('div')
            dataBlock.id = `dataBlock_${index}`
            const updateTime = moment(element.dataContent.updateTime)
            let content = element.dataContent.content
            let importance = element.dataContent.importance
            dataBlock.innerHTML = `
            <span> ${updateTime} </span>
            <span id='content'> ${content} </span>
            <span id='importance'> ${importance} </span> 
            `
            // user methodAreaFunc
            methodsAreaFunc(info, index, dataBlock)
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
            const response = await fetchGetUserInfo(getInfo)
            let length = response.data.length
            addBtn.addEventListener('click', async () => {
                length = length + 1
                const dataBlock = document.createElement('div')
                dataBlock.innerHTML = `
                <input id="contentValue_${length}" type="text" placeholder="write description"/>
                <select name="levels" id='levelSelect_${length}'>
                    <option value="">--Choose Importance--</option>
                    <option value="Very Important">Very Important</option>
                    <option value="Important">Important</option>
                    <option value="Normal">Normal</option>
                    <option value="Not Important">Not Important</option>
                </select>
                <input id ="submitChange_${length}" type="button" name="submit" value="confirm"/>
                `
                container.appendChild(dataBlock)
                const submitBtn = document.getElementById(`submitChange_${length}`)
                submitBtn.addEventListener('click', async (e) => {
                    e.preventDefault()
                    const contentValue = document.getElementById(`contentValue_${length}`).value
                    const importanceValue = document.getElementById(`levelSelect_${length}`).value
                    const response = await fetchUserInfo({
                        id: info.id,
                        data: [{
                            dataContent: {
                                content: contentValue,
                                importance: importanceValue,
                            }
                        }]
                    }, 'add')
                    if (response.valid === true) {
                        const data = await fetchGetUserInfo(info)
                        const element = data.data[data.data.length - 1]
                        const updateTime = moment(element.dataContent.updateTime)
                        let content = element.dataContent.content
                        let importance = element.dataContent.importance
                        dataBlock.innerHTML = `
                        <span> ${updateTime} </span>
                        <span id='content'> ${content} </span>
                        <span id='importance'> ${importance} </span> 
                        `
                        methodsAreaFunc(info, length, dataBlock)
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