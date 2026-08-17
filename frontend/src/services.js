import axios from 'axios'
const baseUrl = ''

//gets all sets for current user
const getSets = (token) => {
    return axios.get(`${baseUrl}/sets`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    
}
const getSet = (token, setId) => {
    return axios.get(`${baseUrl}/sets/${setId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
const searchSet = (word) => {
    return axios.get(`${baseUrl}/searchSets/${word}`)
}
const login = (email, password) => {
    return axios.post(`${baseUrl}/login`, {email, password})
}
const signup = (email, password, user) => {
    return axios.post(`${baseUrl}/signup`, {email, password, user})
}
const createSet = (token, title, description, cards, username) => {
    return axios.post(`${baseUrl}/sets`, {title, description, cards, username}, 
    {headers: {Authorization: `Bearer ${token}`}})
}
const deleteSet = (token, setId) => {
    return axios.delete(`${baseUrl}/sets/${setId}`, {headers: {Authorization: `Bearer ${token}`}})
}


export default { getSets, getSet, login, createSet, signup, searchSet, deleteSet }