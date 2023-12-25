import storage from 'redux-persist/lib/storage';
// обертка над стором и обертка редюсеров для удобного хранения
import {
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// набор редюсеров
const rootReducer = combineReducers({
    user: userReducer,
});


const persistConfig = {
    key: 'root',
    storage: storage,
}

//  принимает конфиг и набор редюсеров
const persistedReducer = persistReducer(persistConfig, rootReducer);

// во время конфигурации стора передаем созданный редюсер
const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// чтобы приложение могло работать с redux-persiston
export const persistor = persistStore(store);
export default store;