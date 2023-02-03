import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:5000"
})

export const getUser = async () => {
    const response = await userApi.get("/users/:id")
    return response.data
}