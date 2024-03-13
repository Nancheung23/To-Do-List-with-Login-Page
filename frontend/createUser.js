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

// fetch create user
const createFetch = async (info) => {
    try {
        const response = await fetch('http://localhost:5000/api/create', {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
            },
            body : JSON.stringify(info)
        })
        if(response.status === 200) {
            try {
                const responseGet = await getFetch()
                console.log(responseGet)
                const user = responseGet.find(user => (user.username === info.username && user.password === info.password))
                if(user !== -1) {
                    const userId = user.id
                    localStorage.setItem('userId', userId)
                    window.location.href = './index.html'
                }
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const submitNewUser = () => {
    const submitBtn = document.getElementById('submitBtn')
    submitBtn.addEventListener('click', async(e) => {
        e.preventDefault()
        const info = {
            username : document.getElementById('username').value,
            password : document.getElementById('password').value
        }
        try {
            await createFetch(info)
        } catch (error) {
            console.log(error)
        }
    })
}

submitNewUser()