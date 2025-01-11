import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../utils/config';

export const fetchPatientById = createAsyncThunk(
    'patient/fetchById',
    async(patientId, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/users/patient/${encodeURIComponent(patientId)}`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch patient');
        }
    }
);

export const fetchPatientByUserId = createAsyncThunk(
    'patient/fetchByUserId',
    async(_, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/users/patient`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch patient');
        }
    }
);

export const fetchAllPatients = createAsyncThunk(
    'patient/fetchAll',
    async(_, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/users/patients`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch all patients');
        }
    }
);