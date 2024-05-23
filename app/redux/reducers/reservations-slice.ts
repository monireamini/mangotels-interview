import {createSlice} from '@reduxjs/toolkit';
import {initialReservations} from "@/app/lib/mock-data";

// @todo: use redux persist
const reservationsSlice = createSlice({
    name: 'reservations',
    initialState: {
        items: initialReservations
    },
    reducers: {
        CREATE_RESERVATION: (state, action) => {
            state.items = [action.payload, ...state.items];
        },

        CANCEL_RESERVATION: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
    }
});

export const {CREATE_RESERVATION, CANCEL_RESERVATION} = reservationsSlice.actions;
export default reservationsSlice.reducer;
