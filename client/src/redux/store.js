import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import doctorReducer from "./slices/doctorSlice";
import recordReducer from "./slices/recordSlice";
import packageReducer from "./slices/packageSlice";
import patientReducer from "./slices/patientSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        patient: patientReducer,
        doctor: doctorReducer,
        record: recordReducer,
        package: packageReducer
    }
});

export default store;