import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user/';
const PRO_API_URL = 'http://localhost:5000/api/protected/';

export const register = (userData) => axios.post(API_URL + 'register', userData);
export const login = (userData) => axios.post(API_URL + 'login',userData);
export const getToken = (token) => axios.create({
    baseURL: PRO_API_URL ,
    headers: { Authorization: token ? `Bearer ${token}` : '' },
});

