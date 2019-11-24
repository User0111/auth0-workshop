import axios from 'axios';
import {getInstance} from "./index";

export const setAuthInterceptor = () => {
    axios.interceptors.request.use(async (request) => {
        const token = await getAuthToken();
        if (token) {
            request.headers['Authorization'] = `Bearer ${token}`
        }
        return request
    }, (error) => {
        return Promise.reject(error);
    });
};

const getAuthToken = async () => {
    return getInstance().getTokenSilently();
};
