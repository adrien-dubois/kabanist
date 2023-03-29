import axios, {  AxiosResponse, InternalAxiosRequestConfig } from "axios";


const baseUrl = process.env.REACT_APP_API;
const getToken = () => localStorage.getItem('token');

const API = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

API.interceptors.request.use( 
    (config: InternalAxiosRequestConfig) => {
        const token = getToken();

        if(token){
            config.headers['Authorization'] = `Bearer ` + token;
        }
        
        return config;
})

API.interceptors.response.use(
    (response: AxiosResponse) => {
        if(response && response.data) return response.data;
        return response;
    }, (err: any) => {
        if(!err.response) {
            return console.log(err);
        }
        throw err.response;
    }
)

export default API;