import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingApi from '../../api/bookingApi';


export const getAll = createAsyncThunk('booking/getAll', async (filter = '') => {
    const response = await bookingApi.getAll(filter)
    return response
});

export const getAllDelete = createAsyncThunk('booking/getAllDelete', async (filter = '') => {
    const response = await bookingApi.getAllDelete(filter)
    return response
});

export const addBooking = createAsyncThunk('booking/addBooking', async (bookingForm) => {
    const response = await bookingApi.add(bookingForm)
    return response
});

export const editBooking = createAsyncThunk('booking/editBooking', async ({ id, bookingForm }) => {
    const response = await bookingApi.edit(id, bookingForm)
    return response
});

export const deleteBooking = createAsyncThunk('booking/deleteBooking', async (id) => {
    const response = await bookingApi.delete(id)
    return response
});

export const deleteMultiBooking = createAsyncThunk('booking/deleteMultiBooking', async (ids) => {
    const response = await bookingApi.deleteMulti(ids)
    return response
});

export const restore = createAsyncThunk('booking/restore', async (id) => {
    const response = await bookingApi.restore(id)
    return response
});

export const restoreMulti = createAsyncThunk('booking/restoreMulti', async (ids) => {
    const response = await bookingApi.restoreMulti(ids)
    return response
});


const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookingLoading: false,
        bookings: null,
        booking: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.bookingLoading = true;
        })
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.bookingLoading = false;
            if (action.payload.success) {
                state.bookings = action.payload.bookings;
            } else {
                state.bookings = null;
            }
        })
        builder.addCase(getAllDelete.pending, (state, action) => {
            state.bookingLoading = true;
        })
        builder.addCase(getAllDelete.fulfilled, (state, action) => {
            state.bookingLoading = false;
            if (action.payload.success) {
                state.bookings = action.payload.bookings;
            } else {
                state.bookings = null;
            }
        })
        builder.addCase(deleteBooking.pending, (state, action) => {
            state.bookingLoading = true;
        })
        builder.addCase(deleteBooking.fulfilled, (state, action) => {
            state.bookingLoading = false;
        })
        builder.addCase(addBooking.pending, (state, action) => {
            state.bookingLoading = true;
        })
        builder.addCase(addBooking.fulfilled, (state, action) => {
            state.bookingLoading = false;
        })
        builder.addCase(editBooking.pending, (state, action) => {
            state.bookingLoading = true;
        })
        builder.addCase(editBooking.fulfilled, (state, action) => {
            state.bookingLoading = false;
        })
    },
});

const bookingReducer = bookingSlice.reducer;

export const bookingSelector = (state) => state.bookingReducer;

// export const {  } = bookingSlice.actions;

export default bookingReducer;
