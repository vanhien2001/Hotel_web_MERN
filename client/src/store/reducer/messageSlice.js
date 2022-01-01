import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messageApi from '../../api/messageApi';


export const getAll = createAsyncThunk('message/getAll', async (filter = '') => {
    const response = await messageApi.getAll(filter)
    return response
});

export const addMessage = createAsyncThunk('message/addMessage', async (messageForm) => {
    const response = await messageApi.add(messageForm)
    return response
});

export const editMessage = createAsyncThunk('message/editMessage', async ({ id, messageForm }) => {
    const response = await messageApi.edit(id, messageForm)
    return response
});

export const deleteMessage = createAsyncThunk('message/deleteMessage', async (id) => {
    const response = await messageApi.delete(id)
    return response
});


const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messageLoading: false,
        messages: null,
        message: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.messageLoading = true;
        })
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.messageLoading = false;
            if (action.payload.success) {
                state.messages = action.payload.messages;
            } else {
                state.messages = null;
            }
        })
        builder.addCase(deleteMessage.pending, (state, action) => {
            state.messageLoading = true;
        })
        builder.addCase(deleteMessage.fulfilled, (state, action) => {
            state.messageLoading = false;
        })
        builder.addCase(addMessage.pending, (state, action) => {
            state.messageLoading = true;
        })
        builder.addCase(addMessage.fulfilled, (state, action) => {
            state.messageLoading = false;
        })
        builder.addCase(editMessage.pending, (state, action) => {
            state.messageLoading = true;
        })
        builder.addCase(editMessage.fulfilled, (state, action) => {
            state.messageLoading = false;
        })
    },
});

const messageReducer = messageSlice.reducer;

export const messageSelector = (state) => state.messageReducer;

// export const {  } = messageSlice.actions;

export default messageReducer;
