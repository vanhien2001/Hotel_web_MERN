import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/userSlice';
import roomReducer from './reducer/roomSlice';
import typeRoomReducer from './reducer/typeRoomSlice';
import bookingReducer from './reducer/bookingSlice';
import serviceReducer from './reducer/serviceSlice';
import staffReducer from './reducer/staffSlice';

const store = configureStore({
    reducer: {
        userReducer,
        typeRoomReducer,
        roomReducer,
        bookingReducer,
        serviceReducer,
        staffReducer
    }
})

export default store