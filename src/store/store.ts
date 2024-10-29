import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import  authReducer  from './reducers/authSlice';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isAuthenticated', 'userData'], 
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    });
};

export const persistor = persistStore(makeStore());

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppStore = ReturnType<typeof makeStore>
