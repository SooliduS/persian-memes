import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3500/api',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});
export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:3500/api',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json'}
});
