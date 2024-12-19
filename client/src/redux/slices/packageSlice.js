import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPackages, fetchPackageById, createPackage, grantAccess, revokeAccess, deletePackage } from "../thunks/packageThunks";
import { act } from "react";

const initialState = {
    packages: [],
    currentPackage: {
        id: null,
        patientId: null,
        accessType: '',
        docId: '',
        recPatientId: '',
        records: [],
        qrcodeUrl: '',
        accessGranted: false,
        accessDate: ''
    },
    fetchStatus: 'idle',
    createStatus: 'idle',
    grantStatus: 'idle',
    revokeStatus: 'idle',
    deleteStatus: 'idle',
    error: null
}

const packageSlice = createSlice({
    name: 'package',
    initialState,
    extraReducers: (builder) => {
        builder
            // fetch by id promise handlers
            .addCase(fetchPackageById.pending, (state) => {
                state.fetchStatus = 'pending';
                state.error = null;
            })
            .addCase(fetchPackageById.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded';
                state.currentPackage = action.payload;
            })
            .addCase(fetchPackageById.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })

            // fetch all promise handlers
            .addCase(fetchAllPackages.pending, (state) => {
                state.fetchStatus = 'pending';
                state.error = null;
            })
            .addCase(fetchAllPackages.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded';
                state.packages = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllPackages.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })

            // create promise handlers
            .addCase(createPackage.pending, (state) => {
                state.createStatus = 'pending';
                state.error = null;
            })
            .addCase(createPackage.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.currentPackage = action.payload;
            })
            .addCase(createPackage.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })

            // grant promise handlers
            .addCase(grantAccess.pending, (state) => {
                state.grantStatus = 'pending';
                state.error = null;
            })
            .addCase(grantAccess.fulfilled, (state, action) => {
                state.grantStatus = 'succeeded';
            })
            .addCase(grantAccess.rejected, (state, action) => {
                state.grantStatus = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })

            // revoke promise handlers
            .addCase(revokeAccess.pending, (state) => {
                state.revokeStatus = 'pending';
                state.error = null;
            })
            .addCase(revokeAccess.fulfilled, (state, action) => {
                state.revokeStatus = 'succeeded';
            })
            .addCase(revokeAccess.rejected, (state, action) => {
                state.revokeStatus = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })

            // delete promise handlers 
            .addCase(deletePackage.pending, (state) => {
                state.deleteStatus = 'pending';
                state.error = null;
            })
            .addCase(deletePackage.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.currentPackage = initialState.currentPackage;
            })
            .addCase(deletePackage.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })
    }
});

export default packageSlice.reducer;