const fetchPostLogin = async (userinfo) => {
    console.log(JSON.stringify(userinfo))
    try {
        const response = await fetch(`http://localhost:5000/submit`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(userinfo)
        })
        if (response.status === 200) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

const submitEvent = async () => {
    const submit = document.getElementById('submit')
    submit.addEventListener('click', async (e) => {
        e.preventDefault()
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const userinfo = {
            username: username,
            password: password,
        }
        try {
            const check = await fetchPostLogin(userinfo)
            console.log(check)
            if(check.valid === true) {
                console.log('correct userinfo')
            } else {
                console.log('incorrect userinfo')
            }
        } catch (error) {
            console.log(error)
        }
    })
}

submitEvent()
