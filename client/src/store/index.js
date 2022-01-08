import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/userSlice';
import roomReducer from './reducer/roomSlice';
import typeRoomReducer from './reducer/typeRoomSlice';
import bookingReducer from './reducer/bookingSlice';
import serviceReducer from './reducer/serviceSlice';
import staffReducer from './reducer/staffSlice';
import jobReducer from './reducer/jobSlice';
import commentReducer from './reducer/commentSlice';
import conversationReducer from './reducer/conversationSlice';
import messageReducer from './reducer/messageSlice';

const store = configureStore({
    reducer: {
        userReducer,
        typeRoomReducer,
        roomReducer,
        bookingReducer,
        serviceReducer,
        staffReducer,
        jobReducer,
        commentReducer,
        conversationReducer,
        messageReducer
    }
})

export default store