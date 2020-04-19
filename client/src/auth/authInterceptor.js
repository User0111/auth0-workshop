import axios from 'axios';
import {getInstance} from './index';

export const setAuthInterceptor = () => {
    axios.interceptors.request.use(async (req) => {
        const token = await getToken();
        req.headers['Authorization'] = `Bearer ${token}`;
        return req;
    }, (error) => {
        return Promise.reject(error);
    })
};

const getToken = async () => {
    return getInstance().getTokenSilently();
};


