import {createSlice} from '@reduxjs/toolkit';
import {initialReservations} from "@/app/lib/mock-data";

const reservationsSlice = createSlice({
    name: 'reservations',
    initialState: {
        items: initialReservations
    },
    reducers: {
        CREATE_RESERVATION: (state, action) => {
            state.items = [action.payload, ...state.items];
        }
    }
});

export const {CREATE_RESERVATION} = reservationsSlice.actions;
export default reservationsSlice.reducer;
