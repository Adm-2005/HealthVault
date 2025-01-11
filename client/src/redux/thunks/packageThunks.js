import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../utils/config';

export const fetchPackageById = createAsyncThunk(
    'package/fetchById',
    async(packageId, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/packages/${encodeURIComponent(packageId)}`);
            return response.data;
        } 
        catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch package');
        }
    }
);

export const fetchAllPackages = createAsyncThunk(
    'package/fetchAll',
    async(_, {rejectWithValue}) => {
        try {
            const response = await apiClient.get(`${import.meta.env.VITE_BACKEND_URL}/packages`);
            return response.data;
        } 
        catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch all packages');
        }
    }
);

export const createPackage = createAsyncThunk(
    'package/createPackage',
    async({packageData, hr1 = '', hr2 = '', hr3 = '', hr4 = '', hr5 = ''}, {rejectWithValue}) => {
        try {
            const hrParams = [hr1, hr2, hr3, hr4, hr5]
                .filter(Boolean)
                .map((hr, index) => `hr_ids=${encodeURIComponent(hr)}`)
                .join('&');

            const queryString = hrParams ? `?${hrParams}` : '';
            const url = `${import.meta.env.VITE_BACKEND_URL}/packages${queryString}`;

            const response = await apiClient.post(url, packageData);
            return response.data;
        } 
        catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to create package');
        }
    }
);

export const grantAccess = createAsyncThunk(
    'package/grantAccess',
    async({packageId, type, receiverId}, {rejectWithValue}) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/packages/grant/${encodeURIComponent(packageId)}?type=${encodeURIComponent(type)}&rec_id=${encodeURIComponent(receiverId)}`;

            const response = await apiClient.put(url);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to grant access');
        }
    }
);

export const revokeAccess = createAsyncThunk(
    'package/revokeAccess',
    async(packageId, {rejectWithValue}) => {
        try {
            const response = await apiClient.put(`${import.meta.env.VITE_BACKEND_URL}/packages/revoke/${encodeURIComponent(packageId)}`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to revoke access');
        }
    }
);

export const deletePackage = createAsyncThunk(
    'package/delete', 
    async(packageId, {rejectWithValue}) => {
        try {
            const response = await apiClient.delete(`${import.meta.env.VITE_BACKEND_URL}/packages/${encodeURIComponent(packageId)}`);
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || 'Failed to delete package');
        }
    }
);