import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
    baseURL: 'http://192.168.1.187:3000',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
        'content-type': 'application/json'
    },
    responseType: 'json',
});

instance.interceptors.response.use(
    (response) => {
        // Thrown error for request with OK status code
        const { data } = response;
        return response.data;
    },
)

export default instance;