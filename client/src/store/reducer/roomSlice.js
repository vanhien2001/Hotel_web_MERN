import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomApi from '../../api/roomApi';


export const getAll = createAsyncThunk('room/getAll', async (filter) => {
    const response = await roomApi.getAll(filter)
    return response
});

export const getAllDelete = createAsyncThunk('room/getAllDelete', async (filter) => {
    const response = await roomApi.getAllDelete(filter)
    return response
});

export const getStatistics = createAsyncThunk('room/getStatistics', async (filter) => {
    const response = await roomApi.getStatistics(filter)
    return response
});

export const addRoom = createAsyncThunk('room/addRoom', async (roomForm) => {
    const response = await roomApi.add(roomForm)
    return response
});

export const editRoom = createAsyncThunk('room/editRoom', async ({ id, roomForm }) => {
    const response = await roomApi.edit(id, roomForm)
    return response
});

export const deleteRoom = createAsyncThunk('room/deleteRoom', async (id) => {
    const response = await roomApi.delete(id)
    return response
});

export const deleteMultiRoom = createAsyncThunk('Room/deleteMultiRoom', async (ids) => {
    const response = await roomApi.deleteMulti(ids)
    return response
});

export const restore = createAsyncThunk('Room/restore', async (id) => {
    const response = await roomApi.restore(id)
    return response
});

export const restoreMulti = createAsyncThunk('Room/restoreMulti', async (ids) => {
    const response = await roomApi.restoreMulti(ids)
    return response
});


const roomSlice = createSlice({
    name: 'room',
    initialState: {
        roomLoading: false,
        rooms: null,
        quantity: null,
        room: null,
        statistics: null
    },
    reducers: {
        setRoom(state, action) {
            state.room = action.payload
            localStorage.setItem('Room', JSON.stringify(action.payload))
        },
        loadRoom(state, action) {
            if (localStorage['Room']) {
                state.room = JSON.parse(localStorage['Room'])
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.roomLoading = true;
        })
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.roomLoading = false;
            if (action.payload.success) {
                state.rooms = action.payload.rooms;
                state.quantity = action.payload.quantity;
            } else {
                state.rooms = null;
                state.quantity = null;
            }
        })
        builder.addCase(getAllDelete.pending, (state, action) => {
            state.roomLoading = true;
        })
        builder.addCase(getAllDelete.fulfilled, (state, action) => {
            state.roomLoading = false;
            if (action.payload.success) {
                state.rooms = action.payload.rooms;
                state.quantity = action.payload.quantity;
            } else {
                state.rooms = null;
                state.quantity = null;
            }
        })
        builder.addCase(getStatistics.fulfilled, (state, action) => {
            state.roomLoading = false;
            if (action.payload.success) {
                state.statistics = action.payload.statistics;
            } else {
                state.statistics = null;
            }
        })
        builder.addCase(deleteRoom.pending, (state, action) => {
            state.roomLoading = true;
        })
        builder.addCase(deleteRoom.fulfilled, (state, action) => {
            state.roomLoading = false;
        })
        builder.addCase(addRoom.pending, (state, action) => {
            state.roomLoading = true;
        })
        builder.addCase(addRoom.fulfilled, (state, action) => {
            state.roomLoading = false;
        })
        builder.addCase(editRoom.pending, (state, action) => {
            state.roomLoading = true;
        })
        builder.addCase(editRoom.fulfilled, (state, action) => {
            state.roomLoading = false;
        })
    }
})

const roomReducer = roomSlice.reducer;

export const roomSelector = (state) => state.roomReducer;

export const { setRoom, loadRoom } = roomSlice.actions

export default roomReducer;
