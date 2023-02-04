import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
});


export const loginUser = async ({email, password}) => {
    try {
        const { data } = await api.post('/auth', {email, password});
        return data;
    } catch (error) {
        throw Error(error.response.data.message)
    }
}