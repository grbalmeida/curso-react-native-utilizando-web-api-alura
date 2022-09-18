import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fake-api-alura-repositorios.herokuapp.com/'
});

export default api;