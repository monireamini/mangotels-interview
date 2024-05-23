import {createSlice} from '@reduxjs/toolkit';
import {generateAvailabilityData} from "@/app/lib/utility";

const roomAvailabilitySlice = createSlice({
    name: 'roomAvailability',
    initialState: {
        items: generateAvailabilityData("2024-05-23", "2024-07-23")
    },
    reducers: {}
});

export default roomAvailabilitySlice.reducer;
