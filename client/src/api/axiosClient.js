import axios from 'axios';
// import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://192.168.1.128:5000", 
    headers: {
        'Content-type': 'application/json',
    },
    //   paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage['User']
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    }, 
    (error) => {
        if (error.response) return error.response.data
        else return { success: false, message: error.message }
    })

export default axiosClient;