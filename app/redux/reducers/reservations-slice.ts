import {createSlice} from '@reduxjs/toolkit';
import {initialReservations} from "@/app/lib/placeholder-data";

// @todo: use redux persist
// @todo: use hash map for optimizing accessing and updating process
const reservationsSlice = createSlice({
    name: 'reservations',
    initialState: {
        items: initialReservations
    },
    reducers: {
        CREATE_RESERVATION: (state, action) => {
            state.items = [action.payload, ...state.items];
        },

        UPDATE_RESERVATION: (state, action) => {
            state.items = state.items.map((item) => item.id === action.payload.id ? action.payload : item);
        },

        CANCEL_RESERVATION: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
    }
});

export const {CREATE_RESERVATION, UPDATE_RESERVATION, CANCEL_RESERVATION} = reservationsSlice.actions;
export default reservationsSlice.reducer;
