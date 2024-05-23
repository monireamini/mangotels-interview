import {configureStore} from '@reduxjs/toolkit';
import reservationsReducer from './reducers/reservations-slice';
import roomAvailabilityReducer from "@/app/redux/reducers/room-availability-slice";
import guestsReducer from "@/app/redux/reducers/guests-slice";

export default configureStore({
    reducer: {
        reservations: reservationsReducer,
        roomAvailability: roomAvailabilityReducer,
        guests: guestsReducer,
    }
});
