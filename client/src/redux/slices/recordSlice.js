import { createSlice } from "@reduxjs/toolkit";
import { fetchRecordById, fetchAllRecords, createRecord, updateRecord, deleteRecord } from "../thunks/recordThunks";

const initialState = {
    records: [],
    currentRecord: {
        id: null,
        patient_id: null,
        title: '',
        record_date: '',
        file_type: '',
        file_name: '',
        upload_date: '',
        notes: ''
    },
    recordFetchStatus: 'idle',
    recordCreateStatus: 'idle',
    recordUpdateStatus: 'idle',
    recordDeleteStatus: 'idle',
    recordError: null
};

const recordSlice = createSlice({
    name: 'record',
    initialState,
    reducers: {
        updateRecordError: (state, action) => {
            state.recordError = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch by id promise handlers
            .addCase(fetchRecordById.pending, (state) => {
                state.recordFetchStatus = 'pending';
                state.recordError = null;
            })
            .addCase(fetchRecordById.fulfilled, (state, action) => {
                state.recordFetchStatus = 'succeeded';
                state.currentRecord = action.payload;
            })
            .addCase(fetchRecordById.rejected, (state, action) => {
                state.recordFetchStatus = 'failed';
                state.recordError = action.payload?.recordError || 'Unknown recordError occurred';
            })

            // fetch all records promise handles
            .addCase(fetchAllRecords.pending, (state) => {
                state.recordFetchStatus = 'pending';
                state.recordError = null;
            })
            .addCase(fetchAllRecords.fulfilled, (state, action) => {
                state.recordFetchStatus = 'succeeded';
                state.records = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllRecords.rejected, (state, action) => {
                state.recordFetchStatus = 'failed';
                state.recordError = action.payload?.recordError || 'Unknown recordError occurred';
            })

            // create record promise handlers
            .addCase(createRecord.pending, (state) => {
                state.recordCreateStatus = 'pending';
                state.recordError = null;
            })
            .addCase(createRecord.fulfilled, (state, action) => {
                state.recordCreateStatus = 'succeeded';
                state.currentRecord = action.payload;
            })
            .addCase(createRecord.rejected, (state, action) => {
                state.recordCreateStatus = 'failed';
                state.recordError = action.payload?.recordError || 'Unknown recordError occurred';
            })

            // update record promise handlers
            .addCase(updateRecord.pending, (state) => {
                state.recordUpdateStatus = 'pending';
                state.recordError = null;
            })
            .addCase(updateRecord.fulfilled, (state, action) => {
                state.recordUpdateStatus = 'succeeded';
                state.currentRecord = action.payload;
            })
            .addCase(updateRecord.rejected, (state, action) => {
                state.recordUpdateStatus = 'failed';
                state.recordError = action.payload?.recordError || 'Unknown recordError occurred';
            })

            // delete record promise handlers
            .addCase(deleteRecord.pending, (state) => {
                state.recordDeleteStatus = 'pending';
                state.recordError = null;
            })
            .addCase(deleteRecord.fulfilled, (state) => {
                state.recordDeleteStatus = 'fulfilled';
                state.currentRecord = initialState.currentRecord;
            })
            .addCase(deleteRecord.rejected, (state, action) => {
                state.recordDeleteStatus = 'failed';
                state.recordError = action.payload?.recordError || 'Unknown recordError occurred';
            })
    }
});

export const { updateRecordError } = recordSlice.actions;
export default recordSlice.reducer;