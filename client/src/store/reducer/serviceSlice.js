import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import serviceApi from '../../api/serviceApi';


export const getAll = createAsyncThunk('service/getAll', async (filter = '') => {
    const response = await serviceApi.getAll(filter)
    return response
});

export const getAllDelete = createAsyncThunk('service/getAllDelete', async (filter = '') => {
    const response = await serviceApi.getAllDelete(filter)
    return response
});

export const getStatistics = createAsyncThunk('service/getStatistics', async (filter) => {
    const response = await serviceApi.getStatistics(filter)
    return response
});

export const addService = createAsyncThunk('service/addService', async (serviceForm) => {
    const response = await serviceApi.add(serviceForm)
    return response
});

export const editService = createAsyncThunk('service/editService', async ({ id, serviceForm }) => {
    const response = await serviceApi.edit(id, serviceForm)
    return response
});

export const deleteService = createAsyncThunk('service/deleteService', async (id) => {
    const response = await serviceApi.delete(id)
    return response
});

export const deleteMultiService = createAsyncThunk('service/deleteMultiService', async (ids) => {
    const response = await serviceApi.deleteMulti(ids)
    return response
});

export const restore = createAsyncThunk('service/restore', async (id) => {
    const response = await serviceApi.restore(id)
    return response
});

export const restoreMulti = createAsyncThunk('service/restoreMulti', async (ids) => {
    const response = await serviceApi.restoreMulti(ids)
    return response
});

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        serviceLoading: false,
        services: null,
        service: null,
        statistics: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.serviceLoading = true;
        })
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.serviceLoading = false;
            if (action.payload.success) {
                state.services = action.payload.services;
            } else {
                state.services = null;
            }
        })
        builder.addCase(getAllDelete.pending, (state, action) => {
            state.serviceLoading = true;
        })
        builder.addCase(getAllDelete.fulfilled, (state, action) => {
            state.serviceLoading = false;
            if (action.payload.success) {
                state.services = action.payload.services;
            } else {
                state.services = null;
            }
        })
        builder.addCase(getStatistics.fulfilled, (state, action) => {
            state.serviceLoading = false;
            if (action.payload.success) {
                console.log(action.payload.statistics)
                state.statistics = action.payload.statistics;
            } else {
                state.statistics = null;
            }
        })
        builder.addCase(deleteService.pending, (state, action) => {
            state.serviceLoading = true;
        })
        builder.addCase(deleteService.fulfilled, (state, action) => {
            state.serviceLoading = false;
        })
        builder.addCase(addService.pending, (state, action) => {
            state.serviceLoading = true;
        })
        builder.addCase(addService.fulfilled, (state, action) => {
            state.serviceLoading = false;
        })
        builder.addCase(editService.pending, (state, action) => {
            state.serviceLoading = true;
        })
        builder.addCase(editService.fulfilled, (state, action) => {
            state.serviceLoading = false;
        })
    },
});

const serviceReducer = serviceSlice.reducer;

export const serviceSelector = (state) => state.serviceReducer;

// export const {  } = serviceSlice.actions;

export default serviceReducer;
