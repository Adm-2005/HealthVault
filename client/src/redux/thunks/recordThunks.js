import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecordById = createAsyncThunk(
    "record/fetchById",
    async(recordId, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/records/${encodeURIComponent(recordId)}`, { withCredentials: true });
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || "Failed to fetch record");
        }
    }
);

export const fetchAllRecords = createAsyncThunk(
    "record/fetchAll",
    async(patientId, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/records/${encodeURIComponent(patientId)}`, { withCredentials: true });
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || "Failed to fetch all records");
        }
    }
);

export const createRecord = createAsyncThunk(
    "record/create",
    async(recordData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/records`, recordData, { withCredentials: true });
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || "Failed to create record");
        }
    }
);

export const updateRecord = createAsyncThunk(
    "record/update",
    async({recordId, recordData}, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/records/${encodeURIComponent(recordId)}`, recordData, { withCredentials: true });
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || "Failed to update record");
        }
    }
);

export const deleteRecord = createAsyncThunk(
    "record/delete",
    async(recordId, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/records/${encodeURIComponent(recordId)}`, { withCredentials: true });
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || "Failed to delete record");
        }
    }
);