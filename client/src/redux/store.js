import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import doctorReducer from "./slices/doctorSlice";
import recordReducer from "./slices/recordSlice";
import packageReducer from "./slices/packageSlice";
import patientReducer from "./slices/patientSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'patient', 'doctor', 'record', 'package']
};

const rootReducer = combineReducers({
    user: userReducer,
    patient: patientReducer,
    doctor: doctorReducer,
    record: recordReducer,
    package: packageReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);
export default store;