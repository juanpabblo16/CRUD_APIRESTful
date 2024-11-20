import axios from 'axios';

const API_URL = 'http://localhost:5000/graphql';

const getUser = (id) => {
    return axios.get(API_URL + `users/${id}`);
};

const getAllUsers = () => {
    return axios.get(API_URL + 'users');
};

const updateUser = (id, userData) => {
    return axios.put(API_URL + `users/${id}`, userData);
};

const deleteUser = (id) => {
    return axios.delete(API_URL + `users/${id}`);
};

export default {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
};
