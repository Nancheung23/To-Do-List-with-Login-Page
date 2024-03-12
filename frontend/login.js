// fetch from 'api/submit'
const submitFetch = async (info) => {
    try {
        const response = await fetch('http://localhost:5000/api/submit', {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify(info),
        })
        return response.json()
    } catch (error) {
        console.log()
    }
}

// fetch from '/api/create'
const createFetch = async (info) => {
    try {
        const response = await fetch('http://localhost:5000/api/create', {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify(info)
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

// input example of '/api/create'
const createInfo = {
        username : 'nan',
        password : '123'
}

// fetch from '/api/change'
const changeFetch = async(info) => {
    try {
        const response = await fetch('http://localhost:5000/api/change', {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify(info)
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

// input example of '/api/change'
const changeInfo = {
    username : 'nan',
    password : 'new password'
}

// add event listener to submit btn and check user info
const submitMethod = () => {
    const submitBtn = document.getElementById('submitBtn')
    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        const usernameValue = document.getElementById('username').value
        const passwordValue = document.getElementById('password').value
        const info = {
            username : usernameValue,
            password : passwordValue
        }
        const response = await submitFetch(info)
        if(response.valid === true) {
            console.log('verify user : correct')
        } else {
            console.log('incorrect')
        }
    })
}

// console.log(createFetch(createInfo))
// console.log(changeFetch(changeInfo))
submitMethod()