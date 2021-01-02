import Axios from "axios";

export const api = Axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const uploadApi = Axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
    }
});
