import { createSlice } from "@reduxjs/toolkit";
import { fetchPatientById, fetchPatientByUserId, fetchAllPatients } from "../thunks/patientThunks";

const initialState = {
    currentPatient: {
        id: null,
        userId: null,
    },
    patientsList: [],
    status: 'idle',
    error: null
}

const patientSlice = createSlice({
    name: 'patient',
    initialState,
    extraReducers: (builder) => {
        builder
            // fetch by id promise handlers
            .addCase(fetchPatientById.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchPatientById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentPatient = action.payload;
            })
            .addCase(fetchPatientById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })

            // fetch by user id promise handlers
            .addCase(fetchPatientByUserId.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchPatientByUserId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentPatient = action.payload;
            })
            .addCase(fetchPatientByUserId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })

            // fetch all promise handlers
            .addCase(fetchAllPatients.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchAllPatients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.patientsList = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllPatients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })
    }
});

export default patientSlice.reducer;