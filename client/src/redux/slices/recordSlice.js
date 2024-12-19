import { createSlice } from "@reduxjs/toolkit";
import { fetchRecordById, fetchAllRecords, createRecord, updateRecord, deleteRecord } from "../thunks/recordThunks";

const initialState = {
    records: [],
    currentRecord: {
        id: null,
        patientId: null,
        title: '',
        recordDate: '',
        fileType: '',
        fileUrl: '',
        uploadDate: '',
        notes: ''
    },
    fetchStatus: 'idle',
    createStatus: 'idle',
    updateStatus: 'idle',
    deleteStatus: 'idle',
    error: null
};

const recordSlice = createSlice({
    name: 'record',
    initialState,
    extraReducers: (builder) => {
        builder
            // fetch by id promise handlers
            .addCase(fetchRecordById.pending, (state) => {
                state.fetchStatus = 'pending';
                state.error = null;
            })
            .addCase(fetchRecordById.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded';
                state.currentRecord = action.payload;
            })
            .addCase(fetchRecordById.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error = action.payload?.error || 'Unknown error occurred';
            })

            // fetch all records promise handles
            .addCase(fetchAllRecords.pending, (state) => {
                state.fetchStatus = 'pending';
                state.error = null;
            })
            .addCase(fetchAllRecords.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded';
                state.records = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllRecords.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error = action.payload?.error || 'Unknown error occurred';
            })

            // create record promise handlers
            .addCase(createRecord.pending, (state) => {
                state.createStatus = 'pending';
                state.error = null;
            })
            .addCase(createRecord.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.currentRecord = action.payload;
            })
            .addCase(createRecord.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.error = action.payload?.error || 'Unknown error occurred';
            })

            // update record promise handlers
            .addCase(updateRecord.pending, (state) => {
                state.updateStatus = 'pending';
                state.error = null;
            })
            .addCase(updateRecord.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                state.currentRecord = action.payload;
            })
            .addCase(updateRecord.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.payload?.error || 'Unknown error occurred';
            })

            // delete record promise handlers
            .addCase(deleteRecord.pending, (state) => {
                state.deleteStatus = 'pending';
                state.error = null;
            })
            .addCase(deleteRecord.fulfilled, (state) => {
                state.deleteStatus = 'fulfilled';
                state.currentRecord = initialState.currentRecord;
            })
            .addCase(deleteRecord.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.payload?.error || 'Unknown error occurred';
            })
    }
});

export default recordSlice.reducer;