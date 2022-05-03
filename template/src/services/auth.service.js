import Http from "./../config/Http"

const api= Http()

export const authService = { 
    loginUser,
}

function loginUser(userData) {
    const { username, password, api } = userData;
    return api.post(`auth/login`, {
        username,
        password,
        api
    })
}
