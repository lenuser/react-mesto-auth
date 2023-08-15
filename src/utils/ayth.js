const baseUrl = 'https://auth.nomoreparties.co'

function getResponseData(res){
    return res.ok ? res.json(): Promise.reject(`${res.status} ${res.statusText}`)
}
//запрос на регистрвцию
export function registration(password, email){
    return fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            password: password,
            email: email,
          })
    })
    .then(res => getResponseData(res))
}
//запрос на авторизацию
export function authorization(password, email){
    return fetch(`${baseUrl}/signin`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            password: password,
            email: email,
          })
    })
    .then(res => getResponseData(res))
}
//запрос на получение данных
export function getUserData(token){
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }})
    .then(res => getResponseData(res))
}