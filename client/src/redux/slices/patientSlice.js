import { createSlice } from "@reduxjs/toolkit";
import { fetchPatientById, fetchPatientByUserId, fetchAllPatients } from "../thunks/patientThunks";

const initialState = {
    currentPatient: {
        id: null,
        user_id: null,
    },
    patientsList: [],
    patientStatus: 'idle',
    patientError: null
}

const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        updatePatientError: (state, action) => {
            state.patientError = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch by id promise handlers
            .addCase(fetchPatientById.pending, (state) => {
                state.patientStatus = 'pending';
                state.patientError = null;
            })
            .addCase(fetchPatientById.fulfilled, (state, action) => {
                state.patientStatus = 'succeeded';
                state.currentPatient = action.payload;
            })
            .addCase(fetchPatientById.rejected, (state, action) => {
                state.patientStatus = 'failed';
                state.patientError = action.payload?.patientError || "Unknown patientError occurred";
            })

            // fetch by user id promise handlers
            .addCase(fetchPatientByUserId.pending, (state) => {
                state.patientStatus = 'pending';
                state.patientError = null;
            })
            .addCase(fetchPatientByUserId.fulfilled, (state, action) => {
                state.patientStatus = 'succeeded';
                state.currentPatient = action.payload;
            })
            .addCase(fetchPatientByUserId.rejected, (state, action) => {
                state.patientStatus = 'failed';
                state.patientError = action.payload?.patientError || "Unknown patientError occurred";
            })

            // fetch all promise handlers
            .addCase(fetchAllPatients.pending, (state) => {
                state.patientStatus = 'pending';
                state.patientError = null;
            })
            .addCase(fetchAllPatients.fulfilled, (state, action) => {
                state.patientStatus = 'succeeded';
                state.patientsList = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllPatients.rejected, (state, action) => {
                state.patientStatus = 'failed';
                state.patientError = action.payload?.patientError || "Unknown patientError occurred";
            })
    }
});

export const { updatePatientError } = patientSlice.actions;
export default patientSlice.reducer;