import { configureStore } from '@reduxjs/toolkit';
import reservationsReducer from './reducers/reservations-slice';

export default configureStore({
    reducer: {
        reservations: reservationsReducer
    }
});
