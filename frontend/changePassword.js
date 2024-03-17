// fetch get
const getFetch = async() => {
    try {
        const response = await fetch(`http://localhost:5000/api/users`, {
            method : 'GET',
            headers : {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
            }
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

// check string with regExp
const checkString = (str) => {
    const hasNoSpace = /^\S+$/.test(str)
    const notAllDigits = /\D/.test(str)
    const hasUpperCase = /[A-Z]/.test(str)
    const hasLowerCase = /[a-z]/.test(str)
    return hasNoSpace && notAllDigits && hasUpperCase && hasLowerCase
}

// submitBtn event.
const submitBtn = document.getElementById('submitBtn')
submitBtn.addEventListener('click', async(e) => {
    e.preventDefault()
    const usernameValue = document.getElementById('username').value
    const passwordValue = document.getElementById('password').value
    const newPasswordValue = document.getElementById('newPassword').value
    submitBtn.insertAdjacentHTML('beforebegin', `<span id='alert'></span>`)
    const alert = document.getElementById('alert')
    if(newPasswordValue.length <= 6) {
        alert.innerText = `New Password can't be too short.`
    } else if(newPasswordValue === passwordValue) {
        alert.innerText = `New Password can't be same as old one`
    } else if(!checkString(newPasswordValue)) {
        alert.innerText = `Need to have no space, not exactly numbers, at least one both upper and lower letter.`
    } else {
        try {
            const response = await getFetch()
            const user = response.find(user => (user.username === usernameValue && user.password === passwordValue))
            if(user) {
                const newInfo = {
                    username : usernameValue,
                    password : newPasswordValue
                }
                const idValue = user.id
                const response = await fetch('http://localhost:5000/api/change', {
                    method : 'POST',
                    headers : {
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json'
                    },
                    body : JSON.stringify(newInfo)
                })
                if(response.status === 200) {
                    localStorage.setItem('userId', idValue)
                    window.location.href = './index.html'
                }
            } else {
                alert.innerText = `Incorrect username or password, please try again!`
            }
        } catch (error) {
            console.log(error)
        }
    }
})