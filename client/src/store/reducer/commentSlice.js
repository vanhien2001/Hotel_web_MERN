import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentApi from '../../api/commentApi';


export const getAll = createAsyncThunk('comment/getAll', async (filter = '') => {
    const response = await commentApi.getAll(filter)
    return response
});

export const addComment = createAsyncThunk('comment/addComment', async (commentForm) => {
    const response = await commentApi.add(commentForm)
    return response
});

export const editComment = createAsyncThunk('comment/editComment', async ({ id, commentForm }) => {
    const response = await commentApi.edit(id, commentForm)
    return response
});

export const deleteComment = createAsyncThunk('comment/deleteComment', async (id) => {
    const response = await commentApi.delete(id)
    return response
});


const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        commentLoading: false,
        comments: null,
        comment: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.commentLoading = true;
        })
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.commentLoading = false;
            if (action.payload.success) {
                state.comments = action.payload.comments;
            } else {
                state.comments = null;
            }
        })
        builder.addCase(deleteComment.pending, (state, action) => {
            state.commentLoading = true;
        })
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.commentLoading = false;
        })
        builder.addCase(addComment.pending, (state, action) => {
            state.commentLoading = true;
        })
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.commentLoading = false;
        })
        builder.addCase(editComment.pending, (state, action) => {
            state.commentLoading = true;
        })
        builder.addCase(editComment.fulfilled, (state, action) => {
            state.commentLoading = false;
        })
    },
});

const commentReducer = commentSlice.reducer;

export const commentSelector = (state) => state.commentReducer;

// export const {  } = commentSlice.actions;

export default commentReducer;
