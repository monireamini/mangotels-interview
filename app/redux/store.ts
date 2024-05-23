import {configureStore} from '@reduxjs/toolkit';
import reservationsReducer from './reducers/reservations-slice';
import roomAvailabilityReducer from "@/app/redux/reducers/room-availability-slice";

export default configureStore({
    reducer: {
        reservations: reservationsReducer,
        roomAvailability: roomAvailabilityReducer,
    }
});
