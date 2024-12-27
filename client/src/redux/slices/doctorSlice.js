import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctorById, fetchDoctorByUserId, fetchAllDoctors } from "../thunks/doctorThunks";

const initialState = {
    currentDoctor: {
        id: null,
        user_id: null,
        affiliation: '',
        specialization: '',
        license_number: ''
    },
    doctorsList: [],
    doctorStatus: 'idle',
    doctorError: null
}

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        updateDoctorError: (state, action) => {
            state.doctorError = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch by id promise handlers
            .addCase(fetchDoctorById.pending, (state) => {
                state.doctorStatus = 'pending';
                state.doctorError = null;
            })
            .addCase(fetchDoctorById.fulfilled, (state, action) => {
                state.doctorStatus = 'succeeded';
                state.currentDoctor = action.payload;
            })
            .addCase(fetchDoctorById.rejected, (state, action) => {
                state.doctorStatus = 'failed';
                state.doctorError = action.payload?.doctorError || "Unknown doctorError occurred";
            })

            // fetch by user id promise handlers
            .addCase(fetchDoctorByUserId.pending, (state) => {
                state.doctorStatus = 'pending';
                state.doctorError = null;
            })
            .addCase(fetchDoctorByUserId.fulfilled, (state, action) => {
                state.doctorStatus = 'succeeded';
                state.currentDoctor = action.payload;
            })
            .addCase(fetchDoctorByUserId.rejected, (state, action) => {
                state.doctorStatus = 'failed';
                state.doctorError = action.payload?.doctorError || "Unknown doctorError occurred";
            })

            // fetch all doctors promise handlers
            .addCase(fetchAllDoctors.pending, (state) => {
                state.doctorStatus = 'pending';
                state.doctorError = null;
            })
            .addCase(fetchAllDoctors.fulfilled, (state, action) => {
                state.doctorStatus = 'succeeded';
                state.doctorsList = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllDoctors.rejected, (state, action) => {
                state.doctorStatus = 'failed';
                state.doctorError = action.payload?.doctorError || "Unknown doctorError occurred";
            })
    }
});

export const { updateDoctorError } = doctorSlice.actions;
export default doctorSlice.reducer;