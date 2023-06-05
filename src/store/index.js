import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// redux
const store = configureStore({
    reducer: {
        // только 1 редюсер
        user: userReducer,
    }
});

export default store;