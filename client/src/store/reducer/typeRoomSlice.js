import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import typeRoomApi from '../../api/typeRoomApi';


export const getAll = createAsyncThunk('typeRoom/getAll', async (filter = '') => {
    const response = await typeRoomApi.getAll(filter)
    return response
});

export const getAllDelete = createAsyncThunk('typeRoom/getAllDelete', async (filter = '') => {
    const response = await typeRoomApi.getAllDelete(filter)
    return response
});

export const addTypeRoom = createAsyncThunk('room/addTypeRoom', async (roomForm) => {
    const response = await typeRoomApi.add(roomForm)
    return response
});

export const editTypeRoom = createAsyncThunk('typeRoom/editTypeRoom', async ({ id, roomForm }) => {
    const response = await typeRoomApi.edit(id, roomForm)
    return response
});

export const deleteTypeRoom = createAsyncThunk('typeRoom/deleteTypeRoom', async (id) => {
    const response = await typeRoomApi.delete(id)
    return response
});

export const deleteMultiTypeRoom = createAsyncThunk('typeRoom/deleteMultiTypeRoom', async (ids) => {
    const response = await typeRoomApi.deleteMulti(ids)
    return response
});

export const restore = createAsyncThunk('typeRoom/restore', async (id) => {
    const response = await typeRoomApi.restore(id)
    return response
});

export const restoreMulti = createAsyncThunk('typeRoom/restoreMulti', async (ids) => {
    const response = await typeRoomApi.restoreMulti(ids)
    return response
});

const typeRoomSlice = createSlice({
    name: 'typeRoom',
    initialState: {
        typeRoomLoading: false,
        typeRoom: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.typeRoomLoading = true;
        })
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.typeRoomLoading = false;
            if (action.payload.success) {
                state.typeRoom = action.payload.typeRooms;
            } else {
                state.typeRoom = null;
            }
        })
        builder.addCase(getAllDelete.pending, (state, action) => {
            state.typeRoomLoading = true;
        })
        builder.addCase(getAllDelete.fulfilled, (state, action) => {
            state.typeRoomLoading = false;
            if (action.payload.success) {
                state.typeRoom = action.payload.typeRooms;
            } else {
                state.typeRoom = null;
            }
        })
        builder.addCase(deleteTypeRoom.pending, (state, action) => {
            state.typeRoomLoading = true;
        })
        builder.addCase(deleteTypeRoom.fulfilled, (state, action) => {
            state.typeRoomLoading = false;
        })
        builder.addCase(addTypeRoom.pending, (state, action) => {
            state.typeRoomLoading = true;
        })
        builder.addCase(addTypeRoom.fulfilled, (state, action) => {
            console.log(action.payload)
            state.typeRoomLoading = false;
        })
        builder.addCase(editTypeRoom.pending, (state, action) => {
            state.typeRoomLoading = true;
        })
        builder.addCase(editTypeRoom.fulfilled, (state, action) => {
            state.typeRoomLoading = false;
        })
    },
});

const typeRoomReducer = typeRoomSlice.reducer;

export const typeRoomSelector = (state) => state.typeRoomReducer;

// export const { } = typeRoomSlice.actions

export default typeRoomReducer;
