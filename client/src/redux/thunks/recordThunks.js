import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../utils/config';

export const fetchRecordById = createAsyncThunk(
    'record/fetchById',
    async(recordId, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/records/${encodeURIComponent(recordId)}`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch record');
        }
    }
);

export const fetchAllRecords = createAsyncThunk(
    'record/fetchAll',
    async(patientId, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/records/patient/${encodeURIComponent(patientId)}`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch all records');
        }
    }
);

export const createRecord = createAsyncThunk(
    'record/create',
    async(recordData, {rejectWithValue}) => {
        try {
            const response = await apiClient.post(`${import.meta.env.VITE_BACKEND_URL}/records`, recordData);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to create record');
        }
    }
);

export const updateRecord = createAsyncThunk(
    'record/update',
    async({recordId, recordData}, {rejectWithValue}) => {
        try {
            const response = await apiClient.put(`${import.meta.env.VITE_BACKEND_URL}/records/${encodeURIComponent(recordId)}`, recordData);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to update record');
        }
    }
);

export const deleteRecord = createAsyncThunk(
    'record/delete',
    async(recordId, {rejectWithValue}) => {
        try {
            const response = await apiClient.delete(`${import.meta.env.VITE_BACKEND_URL}/records/${encodeURIComponent(recordId)}`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to delete record');
        }
    }
);