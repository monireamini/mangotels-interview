import {configureStore} from '@reduxjs/toolkit';
import reservationsReducer from './reducers/reservations-slice';
import roomAvailabilityReducer from "@/app/redux/reducers/room-availability-slice";
import guestsReducer from "@/app/redux/reducers/guests-slice";

const store =  configureStore({
    reducer: {
        reservations: reservationsReducer,
        roomAvailability: roomAvailabilityReducer,
        guests: guestsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>

export default store;
