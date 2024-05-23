import {createSlice} from '@reduxjs/toolkit';
import {initialGuests} from "@/app/lib/mock-data";

const guestsSlice = createSlice({
    name: 'guests',
    initialState: {
        items: initialGuests
    },
    reducers: {
        CREATE_GUEST: (state, action) => {
            state.items = [action.payload, ...state.items];
        },
    }
});

export const {CREATE_GUEST} = guestsSlice.actions;
export default guestsSlice.reducer;
