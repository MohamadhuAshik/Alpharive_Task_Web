import axios from 'axios'


const token = localStorage.getItem("token")

const URL = `https://alpharive-task-server.onrender.com/` || `http://localhost:4001/`
console.log("URL", URL)

const instance = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
})

const login = async (data) => {
    try {
        const response = await axios.post(
            URL + `user/login`, data
        )
        return response.data

    } catch (err) {
        console.log("err", err)
        throw err
    }
}
const signup = async (data) => {
    try {
        const response = await axios.post(
            URL + `user/signup`, data
        )
        return response.data
    } catch (err) {
        console.log("err", err)
        throw err
    }
}

const getAllUser = async () => {
    try {
        const response = await axios.get(
            URL + `user/getAllUser`
        )
        return response.data

    } catch (err) {
        console.log("err", err)
        throw err
    }
}
const getSpecificUser = async () => {
    try {
        const response = await instance.get(
            URL + `user/getSpecifiUser`
        )
        return response.data
    } catch (err) {
        console.log("err", err)
        throw err
    }
}
const sendMessage = async (data) => {
    try {
        const response = await instance.post(
            URL + `message/send`, data
        )
        return response.data

    } catch (err) {
        console.log("err", err)
        throw err
    }
}

const getMessages = async (id) => {
    try {
        const response = await instance.get(
            URL + `message/getMesages/${id}`
        )
        return response.data

    } catch (err) {
        console.log("err", err)
        throw err
    }
}

const API_Services = { signup, login, getAllUser, getSpecificUser, sendMessage, getMessages }

export default API_Services