import {createSlice} from '@reduxjs/toolkit';
import {initialGuests} from "@/app/lib/placeholder-data";

const guestsSlice = createSlice({
    name: 'guests',
    initialState: {
        items: initialGuests
    },
    reducers: {
        CREATE_GUEST: (state, action) => {
            const isExisted = state.items.findIndex((item) => item.id === action.payload.id) > -1;
            if (!isExisted)
                state.items = [action.payload, ...state.items];
        },
    }
});

export const {CREATE_GUEST} = guestsSlice.actions;
export default guestsSlice.reducer;
