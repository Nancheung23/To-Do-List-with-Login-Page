const fetchPostLogin = async (userinfo) => {
    try {
        const response = await fetch(`http://localhost:5000/submit`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(userinfo)
        })
        if (response === 200) {
            const data = await response.json()
            console.log(data)
            return data.valid
        }
    } catch (error) {
        console.log(error)
    }
}

const submitEvent = async () => {
    const usernameElement = document.getElementById('username')
    let username = usernameElement.value
    const passwordElement = document.getElementById('password')
    let password = passwordElement.value
    let userinfo = {
        'username': username,
        'password': password,
    }
    const submit = document.getElementById('submit')
    submit.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
            await fetchPostLogin(userinfo)
        } catch (error) {
            console.log(error)
        }
    })
}

submitEvent()
