import axios from 'axios';

const API_URL = 'http://localhost:3000/Users';

//----------------------Get------------------------//
export const get_users = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};


//----------------------Post------------------------//
export const post_user = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

//----------------------Delete------------------------//
export const delete_user = async (userId) => {
    try {
        await axios.delete(`${API_URL}/${userId}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

//----------------------Put------------------------//
export const update_user = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export default { get_users, post_user, delete_user, update_user };