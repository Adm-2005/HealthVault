import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../utils/config';

export const registerUser = createAsyncThunk(
    'user/register',
    async(userData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, userData);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to register');
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async(credentials, {rejectWithValue}) => {
        try {
            const response = await apiClient.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, credentials);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to login');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async(_, {rejectWithValue}) => {
        try {
            const response = await apiClient.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to logout');
        }
    }
);

export const fetchUserById = createAsyncThunk(
    'user/fetchById',
    async(userId, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch user');
        }
    }
);

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAll',
    async(_, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/users`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch all users');
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/update',
    async({userId, updatedData}, {rejectWithValue}) => {
        try {
          const response = await apiClient.put(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, updatedData);
          return response.data;  
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to update user');
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/delete',
    async(userId, {rejectWithValue}) => {
        try {
            const response = await apiClient.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to delete user');
        }
    }
);