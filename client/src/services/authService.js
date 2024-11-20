import axios from 'axios';

const API_URL = 'http://localhost:5000/graphql';

const register = (name, email, password, role) => {
    return axios.post(API_URL + 'users', { name, email, password, role });
};

const login = (email, password) => {
    return axios.post(API_URL + 'login', { email, password });
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const getUser = () => {
    // Lógica para obtener el usuario (puede ser desde localStorage, cookies, etc.)
    return JSON.parse(localStorage.getItem('user'));  // Ejemplo: obtiene el usuario desde localStorage
};

// authService.js
const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;
