import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPackages, fetchPackageById, createPackage, grantAccess, revokeAccess, deletePackage } from "../thunks/packageThunks";

const initialState = {
    packages: [],
    currentPackage: {
        id: null,
        patient_id: null,
        access_type: '',
        doc_id: '',
        rec_patient_id: '',
        records: [],
        qrcode_url: '',
        access_granted: false,
        access_date: ''
    },
    packageFetchStatus: 'idle',
    packageCreateStatus: 'idle',
    packageGrantStatus: 'idle',
    packageRevokeStatus: 'idle',
    packageDeleteStatus: 'idle',
    packageError: null
}

const packageSlice = createSlice({
    name: 'package',
    initialState,
    reducers: {
        updatePackageError: (state, action) => {
            state.packageError = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch by id promise handlers
            .addCase(fetchPackageById.pending, (state) => {
                state.packageFetchStatus = 'pending';
                state.packageError = null;
            })
            .addCase(fetchPackageById.fulfilled, (state, action) => {
                state.packageFetchStatus = 'succeeded';
                state.currentPackage = action.payload;
            })
            .addCase(fetchPackageById.rejected, (state, action) => {
                state.packageFetchStatus = 'failed';
                state.packageError = action.payload?.error || "Unknown error occurred";
            })

            // fetch all promise handlers
            .addCase(fetchAllPackages.pending, (state) => {
                state.packageFetchStatus = 'pending';
                state.packageError = null;
            })
            .addCase(fetchAllPackages.fulfilled, (state, action) => {
                state.packageFetchStatus = 'succeeded';
                state.packages = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllPackages.rejected, (state, action) => {
                state.packageFetchStatus = 'failed';
                state.packageError = action.payload?.error || "Unknown error occurred";
            })

            // create promise handlers
            .addCase(createPackage.pending, (state) => {
                state.packageCreateStatus = 'pending';
                state.packageError = null;
            })
            .addCase(createPackage.fulfilled, (state, action) => {
                state.packageCreateStatus = 'succeeded';
                state.currentPackage = action.payload;
            })
            .addCase(createPackage.rejected, (state, action) => {
                state.packageCreateStatus = 'failed';
                state.packageError = action.payload?.error || "Unknown error occurred";
            })

            // grant promise handlers
            .addCase(grantAccess.pending, (state) => {
                state.packageGrantStatus = 'pending';
                state.packageError = null;
            })
            .addCase(grantAccess.fulfilled, (state, action) => {
                state.packageGrantStatus = 'succeeded';
            })
            .addCase(grantAccess.rejected, (state, action) => {
                state.packageGrantStatus = 'failed';
                state.packageError = action.payload?.error || "Unknown error occurred";
            })

            // revoke promise handlers
            .addCase(revokeAccess.pending, (state) => {
                state.packageRevokeStatus = 'pending';
                state.packageError = null;
            })
            .addCase(revokeAccess.fulfilled, (state, action) => {
                state.packageRevokeStatus = 'succeeded';
            })
            .addCase(revokeAccess.rejected, (state, action) => {
                state.packageRevokeStatus = 'failed';
                state.packageError = action.payload?.error || "Unknown error occurred";
            })

            // delete promise handlers 
            .addCase(deletePackage.pending, (state) => {
                state.packageDeleteStatus = 'pending';
                state.packageError = null;
            })
            .addCase(deletePackage.fulfilled, (state, action) => {
                state.packageDeleteStatus = 'succeeded';
                state.currentPackage = initialState.currentPackage;
            })
            .addCase(deletePackage.rejected, (state, action) => {
                state.packageDeleteStatus = 'failed';
                state.packageError = action.payload?.error || "Unknown error occurred";
            })
    }
});

export const { updatePackageError } = packageSlice.actions;
export default packageSlice.reducer;