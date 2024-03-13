// fetch from 'api/submit , change, create'
const userFetch = async(info, method) => {
    try {
        const response = await fetch(`http://localhost:5000/api/${method}`, {
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

// fetch info of users
const getFetch = async(info) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users`, {
            method : 'GET',
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

// input example of '/api/create'
const createInfo = {
        username : 'nan',
        password : '123'
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
        const response = await userFetch(info, 'submit')
        if(response.valid === true) {
            console.log('verify user : correct')
            // use localstorage to parse userid and redirect to index.html
            try {
                const responseGet = await getFetch()
                const user = responseGet.find(user => (user.username === usernameValue && user.password === passwordValue))
                if(user !== -1) {
                    const userId = user.id
                    localStorage.setItem('userId', userId)
                    // redirect to index.html
                    window.location.href = './index.html' 
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('incorrect')
        }
    })
}

submitMethod()