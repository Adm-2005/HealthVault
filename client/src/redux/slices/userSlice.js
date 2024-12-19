import { createSlice } from "@reduxjs/toolkit";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    fetchUserById, 
    fetchAllUsers, 
    updateUser, 
    deleteUser 
} from "../thunks/userThunks";

const initialState = {
    currentUser: {
        id: null,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        city: '',
        state: '',
        country: '',
        avatarUrl: '',
        bio: ''
    },
    usersList: [],
    registerStatus: 'idle', // 4 states - idle, loading, succeeded, failed (uniform throughout all slices)
    loginStatus: 'idle',
    logoutStatus: 'idle',
    updateStatus: 'idle',
    deleteStatus: 'idle',
    fetchStatus: 'idle',
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder
            // register promise handlers
            .addCase(registerUser.pending, (state) => {
                state.registerStatus = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerStatus = 'succeeded';
                state.currentUser = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerStatus = 'failed';
                state.error = action.payload?.error || 'Unknown error occurred';
            })

            // login promise handlers
            .addCase(loginUser.pending, (state) => {
                state.loginStatus = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loginStatus = 'succeeded';
                state.currentUser = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginStatus = 'failed';
                state.error = action.payload?.error || 'Unknown error occurred';
            })

            // logout promise handlers
            .addCase(logoutUser.pending, (state) => {
                state.logoutStatus = 'loading';
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.logoutStatus = 'succeeded';
                state.currentUser = initialState.currentUser;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.logoutStatus = 'failed';
                state.error = action.payload?.error || 'Unknown error occurred';
            })

            // fetch by id promise handlers
            .addCase(fetchUserById.pending, (state) => {
                state.fetchStatus = 'loading';
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded';
                state.currentUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error = action.payload?.error || 'Unknown error occurred';
            })

            // fetch all users promise handlers
            .addCase(fetchAllUsers.pending, (state) => {
                state.fetchStatus = 'loading';
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded';
                state.usersList = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error = action.payload?.error || "Unknown error occurred";
            })

            // update promise handlers
            .addCase(updateUser.pending, (state) => {
                state.updateStatus = 'loading';
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                state.currentUser = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.payload?.error || 'Unknown error occurred';
            })

            // delete promise handlers
            .addCase(deleteUser.pending, (state) => {
                state.deleteStatus = 'loading';
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.deleteStatus = 'succeeded';
                state.currentUser = initialState.currentUser;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.payload?.error || 'Unknown error occurred';
            })
    }
});

export default userSlice.reducer;