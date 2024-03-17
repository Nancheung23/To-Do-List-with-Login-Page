// fetch info of users
const getFetch = async (info) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(info),
        })
        return response.json()
    } catch (error) {
        console.log()
    }
}

// fetch create user
const createFetch = async (info, alertBox) => {
    try {
        const response = await fetch('http://localhost:5000/api/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(info)
        })
        if (response.status === 200) {
            try {
                const responseGet = await getFetch()
                const user = responseGet.find(user => (user.username === info.username && user.password === info.password))
                if (user !== -1) {
                    const userId = user.id
                    alertBox.classList.toggle('alertBox')
                    alertBox.innerText = 'Successful operation, redirecting...'
                    setTimeout(() => {
                        localStorage.setItem('userId', userId)
                        window.location.href = './index.html'
                    }, 1000)
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            return response.json()
        }
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

// submit button
const submitNewUser = () => {
    const submitBtn = document.getElementById('submitBtn')
    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        const usernameValue = document.getElementById('username').value
        const passwordValue = document.getElementById('password').value
        const repeatPasswordValue = document.getElementById('password_repeat').value
        submitBtn.insertAdjacentHTML('beforebegin', `<span id='alert'></span>`)
        const alert = document.getElementById('alert')
        alert.classList.add('hint')
        // judge username and password
        if (usernameValue.length <= 4) {
            alert.innerText = `Username can't be too short.`
        } else if (passwordValue.length <= 6) {
            alert.innerText = `Password can't be too short.`
        } else if (passwordValue !== repeatPasswordValue) {
            alert.innerText = `The passwords entered twice are inconsistent.`
        } else if (!checkString(passwordValue)) {
            alert.innerText = `Need to have no space, not exactly numbers, at least one both upper and lower letter.`
        } else {
            const info = {
                username: usernameValue,
                password: passwordValue 
            }
            try {
                const response = await createFetch(info, alert)
                if(!response.valid) {
                    alert.innerText = `${response.info}`
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
}


submitNewUser()