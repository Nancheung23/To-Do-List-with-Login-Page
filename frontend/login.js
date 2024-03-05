const fetchPostLogin = async () => {
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json',
        },
        body: JSON.stringify({username, password})
    })
    return response.json()[0]

}
const submit = document.getElementById('submit')
submit.addEventListener('click', async (e) => {
    e.preventDefault()
    const response = await fetchPostLogin()
    if(response === true) {
        console.log('correct')
    } else {
        console.log('wrong')
    }
})