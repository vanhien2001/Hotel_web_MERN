import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import conversationApi from '../../api/conversationApi';


export const getAll = createAsyncThunk('conversation/getAll', async (filter = '') => {
    const response = await conversationApi.getAll(filter)
    return response
});

export const addConversation = createAsyncThunk('conversation/addConversation', async (conversationForm) => {
    const response = await conversationApi.add(conversationForm)
    return response
});

export const editConversation = createAsyncThunk('conversation/editConversation', async ({ id, conversationForm }) => {
    const response = await conversationApi.edit(id, conversationForm)
    return response
});

export const deleteConversation = createAsyncThunk('conversation/deleteConversation', async (id) => {
    const response = await conversationApi.delete(id)
    return response
});


const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        conversationLoading: false,
        conversations: null,
        conversation: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.conversationLoading = true;
        })
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.conversationLoading = false;
            if (action.payload.success) {
                state.conversations = action.payload.conversations;
            } else {
                state.conversations = null;
            }
        })
        builder.addCase(deleteConversation.pending, (state, action) => {
            state.conversationLoading = true;
        })
        builder.addCase(deleteConversation.fulfilled, (state, action) => {
            state.conversationLoading = false;
        })
        builder.addCase(addConversation.pending, (state, action) => {
            state.conversationLoading = true;
        })
        builder.addCase(addConversation.fulfilled, (state, action) => {
            state.conversationLoading = false;
        })
        builder.addCase(editConversation.pending, (state, action) => {
            state.conversationLoading = true;
        })
        builder.addCase(editConversation.fulfilled, (state, action) => {
            state.conversationLoading = false;
        })
    },
});

const conversationReducer = conversationSlice.reducer;

export const conversationSelector = (state) => state.conversationReducer;

// export const {  } = conversationSlice.actions;

export default conversationReducer;
