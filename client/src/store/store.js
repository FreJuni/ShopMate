import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userSlice from './userSlice'
import productSlice from './productSlice';
import { configureStore } from '@reduxjs/toolkit'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const combinedReducer = combineReducers({
    userInfo: userSlice,
    productInfo: productSlice
})

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
    reducer: {
        reducer: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store;