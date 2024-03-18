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
    const removeBtn = document.createElement('button')
    removeBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5vw"  fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
    </svg>
    `
    removeBtn.id = `remove_${index}`
    removeBtn.classList.add('buttons')
    try {
        removeBtn.addEventListener('click', async () => {
            const response = await fetchUserInfo({
                id: info.id,
                data: {
                    dataId: index,
                }
            }, 'remove')
            if (response.valid === true) {
                block.classList.add('fade-out')
                setTimeout(() => {
                    block.remove()
                }, 1000)
            }
        })
    } catch (error) {
        console.log(error)
    }
    // change
    const modifyBtn = document.createElement('button')
    modifyBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5vw"  fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    </svg>
    `
    modifyBtn.id = `modify_${index}`
    modifyBtn.classList.add('buttons')
    try {
        modifyBtn.addEventListener('click', async (e) => {
            e.preventDefault()
            // modify content
            const contentElement = document.getElementById(`content_${index}`)
            contentElement.innerHTML = `
            <input id="contentValue_${index}" type="text" placeholder=" Input new content"/>
            `
            document.getElementById(`contentValue_${index}`).classList.add('inputs')
            // modify importance
            const importanceElement = document.getElementById(`importance_${index}`)
            importanceElement.innerHTML = `
        <select name="levels" id='levelSelect_${index}'>
            <option value="">Choose Importance</option>
            <option value="Very Important">Very Important</option>
            <option value="Important">Important</option>
            <option value="Normal">Normal</option>
            <option value="Not Important">Not Important</option>
        </select>
        <input id ="submitChange_${index}" type="button" name="submit" value="confirm"/>
        `
            document.getElementById(`levelSelect_${index}`).classList.add('inputs')
            document.getElementById(`submitChange_${index}`).classList.add('submit')
            const submitBtn = document.getElementById(`submitChange_${index}`)
            if(window.innerWidth < 500) {
                block.querySelector('.time').style.display = 'none'
                block.style.flexDirection = 'column'
                submitBtn.style.display = 'block'
            }
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
                    // change color by reloading
                    window.location.reload()
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
    methodsArea.appendChild(modifyBtn)
    methodsArea.appendChild(removeBtn)
    block.appendChild(methodsArea)

}

// load userinfo to webpage
const getDataList = async (info) => {
    try {
        const url = `http://localhost:5000/api/user/${info.id}`
        try {
            const userinfoResponse = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            if (userinfoResponse.status === 200) {
                const data = await userinfoResponse.json()
                const username = data.info.username
                const welcome = document.getElementById('welcome')
                welcome.innerHTML = `<span>Welcome, user ${username} !</span>`
            } else {
                console.log('Incorrect fetch')
            }
        } catch (error) {
            console.log(error)
        }
        const backBtn = document.querySelectorAll('.utility')[0]
        backBtn.insertAdjacentHTML('beforebegin', `<span id='alert'></span>`)
        const alert = document.getElementById('alert')
        backBtn.addEventListener('click', () => {
            alert.innerText = 'redirecting to mainpage'
            alert.classList.toggle('alertBox')
            setTimeout(() => {
                window.location.href = './login.html'
            }, 1500)
        })
        const container = document.getElementById('container')
        // initailize
        const response = await fetchGetUserInfo(info)
        response.data.forEach(async element => {
            let index = response.data.indexOf(element)
            const dataBlock = document.createElement('div')
            dataBlock.id = `dataBlock_${index}`
            dataBlock.classList.add('dataBlock')
            const updateTime = moment(element.dataContent.updateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")
            let content = element.dataContent.content
            let importance = element.dataContent.importance
            dataBlock.innerHTML = `
                <span class='time'> ${updateTime} </span>
                <span id='content_${index}' class='content'> ${content} </span>
                <span id='importance_${index}' class='importance'> ${importance} </span> 
            `
            // add different color for importance
            let importanceElement = dataBlock.querySelector(`#importance_${index}`);
            if (importance === 'Very Important') {
                importanceElement.style.color = 'red';
            } else if (importance === 'Important') {
                importanceElement.style.color = 'pink';
            } else if (importance === 'Normal') {
                importanceElement.style.color = 'blue';
            } else if (importance === 'Not Important') {
                importanceElement.style.color = 'white';
            } else {
                importanceElement.style.color = 'black';
            }

            // user methodAreaFunc
            methodsAreaFunc(info, index, dataBlock)
            // append to container
            container.appendChild(dataBlock)
        })
    }
    catch (error) {
        console.log(error)
    }
}

// add new userinfo to webpage
const addInDataList = async (info) => {
    try {
        const container = document.getElementById('container')
        const addArea = document.createElement('div')
        addArea.innerHTML = `
        <div id="addBtn" name="addElement" class="add-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5vw"  fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        Add
        </div>
        `
        container.appendChild(addArea)
        const addBtn = document.getElementById('addBtn')
        try {
            const response = await fetchGetUserInfo(getInfo)
            let length = response.data.length
            addBtn.addEventListener('click', async () => {
                const uniqueId = new Date().getTime();
                const dataBlock = document.createElement('div')
                dataBlock.classList.add('dataBlock')
                dataBlock.innerHTML = `
                <input id="contentValue_${uniqueId}" class="inputs" type="text" placeholder="write description"/>
                <select name="levels" id='levelSelect_${uniqueId}' class="inputs">
                    <option value="">Choose Importance</option>
                    <option value="Very Important">Very Important</option>
                    <option value="Important">Important</option>
                    <option value="Normal">Normal</option>
                    <option value="Not Important">Not Important</option>
                </select>
                <input id ="submitChange_${uniqueId}" class="submit" type="button" name="submit" value="confirm"/>
                `
                container.appendChild(dataBlock)
                if(window.innerWidth < 500) {
                    dataBlock.style.flexDirection = 'column'
                }
                dataBlock.classList.add('fade-in')
                const submitBtn = document.getElementById(`submitChange_${uniqueId}`)
                submitBtn.addEventListener('click', async (e) => {
                    e.preventDefault()
                    const contentValue = document.getElementById(`contentValue_${uniqueId}`).value
                    const importanceValue = document.getElementById(`levelSelect_${uniqueId}`).value
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
                        const updateTime = moment(element.dataContent.updateTime).format("dddd, MMMM Do YYYY, h:mm:ss a")
                        let content = element.dataContent.content
                        let importance = element.dataContent.importance
                        dataBlock.innerHTML = `
                        <span class='time'> ${updateTime} </span>
                        <span id='content' class='content'> ${content} </span>
                        <span id='importance' class='importance'> ${importance} </span> 
                        `
                        // change color by reloading
                        window.location.reload()
                        methodsAreaFunc(info, length, dataBlock)
                    }
                })
            })
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
}

// get userId from localStorage
const userId = localStorage.getItem('userId')
const info = {
    id: userId,
}

// execute
addInDataList(info)
getDataList(info)