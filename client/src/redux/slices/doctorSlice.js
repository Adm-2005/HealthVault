import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctorById, fetchDoctorByUserId, fetchAllDoctors } from "../thunks/doctorThunks";

const initialState = {
    currentDoctor: {
        id: null,
        userId: null,
        affiliation: '',
        specialization: '',
        licenseNumber: ''
    },
    doctorsList: [],
    status: 'idle',
    error: null
}

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    extraReducers: (builder) => {
        builder
            // fetch by id promise handlers
            .addCase(fetchDoctorById.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchDoctorById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentDoctor = action.payload;
            })
            .addCase(fetchDoctorById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })

            // fetch by user id promise handlers
            .addCase(fetchDoctorByUserId.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchDoctorByUserId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentDoctor = action.payload;
            })
            .addCase(fetchDoctorByUserId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })

            // fetch all doctors promise handlers
            .addCase(fetchAllDoctors.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchAllDoctors.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.doctorsList = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllDoctors.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })
    }
});

export default doctorSlice.reducer;