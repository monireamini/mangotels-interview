import {createSlice} from '@reduxjs/toolkit';
import {generateAvailabilityData} from "@/app/lib/utils";
import {rooms} from "@/app/lib/placeholder-data";

const roomAvailabilitySlice = createSlice({
    name: 'roomAvailability',
    initialState: {
        items: generateAvailabilityData(rooms, "2024-05-23", "2024-07-23")
    },
    reducers: {}
});

export default roomAvailabilitySlice.reducer;
