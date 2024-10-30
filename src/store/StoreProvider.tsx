"use client"

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from './store';
import { setUserData, UserData } from './reducers/authSlice';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, Persistor } from 'redux-persist';

interface StoreProviderProps {
    initialData: UserData;
    children: React.ReactNode;
}

export default function StoreProvider({ initialData, children }: StoreProviderProps) {
    const storeRef = useRef<AppStore | null>(null);
    const persistorRef = useRef<Persistor | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
        storeRef.current.dispatch(setUserData(initialData));
        persistorRef.current = persistStore(storeRef.current);
    }

    const persistor = persistorRef.current as Persistor;

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
