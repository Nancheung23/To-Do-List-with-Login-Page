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

submitMethod()