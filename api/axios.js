import axios from 'axios';

export default axios.create({
    baseURL: 'https://fathomless-fortress-01044.herokuapp.com/api',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});
export const axiosPrivate = axios.create({
    baseURL: 'https://fathomless-fortress-01044.herokuapp.com/api',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json'}
});
