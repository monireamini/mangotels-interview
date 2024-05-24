import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import reservationsReducer from './reducers/reservations-slice';
import roomAvailabilityReducer from "@/app/redux/reducers/room-availability-slice";
import guestsReducer from "@/app/redux/reducers/guests-slice";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    reservations: reservationsReducer,
    roomAvailability: roomAvailabilityReducer,
    guests: guestsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
});

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
