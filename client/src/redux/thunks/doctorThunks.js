import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../utils/config';

export const fetchDoctorById = createAsyncThunk(
    'doctor/fetchById',
    async(doctorId, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/users/doctor/${encodeURIComponent(doctorId)}`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch doctor');
        }
    }
);

export const fetchDoctorByUserId = createAsyncThunk(
    'doctor/fetchByUserId',
    async(_, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/users/doctor`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch doctor');
        }
    }
);

export const fetchAllDoctors = createAsyncThunk(
    'doctor/fetchAll',
    async(_, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/users/doctors`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch all doctors');
        }
    }
);