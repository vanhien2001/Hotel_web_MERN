import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobApi from '../../api/jobApi';


export const getAll = createAsyncThunk('job/getAll', async (filter = '') => {
    const response = await jobApi.getAll(filter)
    return response
});

export const getAllDelete = createAsyncThunk('job/getAllDelete', async (filter = '') => {
    const response = await jobApi.getAllDelete(filter)
    return response
});

export const addJob = createAsyncThunk('job/addJob', async (jobForm) => {
    const response = await jobApi.add(jobForm)
    return response
});

export const editJob = createAsyncThunk('job/editJob', async ({ id, jobForm }) => {
    const response = await jobApi.edit(id, jobForm)
    return response
});

export const deleteJob = createAsyncThunk('job/deleteJob', async (id) => {
    const response = await jobApi.delete(id)
    return response
});

export const deleteMultiJob = createAsyncThunk('job/deleteMultiJob', async (ids) => {
    const response = await jobApi.deleteMulti(ids)
    return response
});

export const restore = createAsyncThunk('job/restore', async (id) => {
    const response = await jobApi.restore(id)
    return response
});

export const restoreMulti = createAsyncThunk('job/restoreMulti', async (ids) => {
    const response = await jobApi.restoreMulti(ids)
    return response
});

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        jobLoading: false,
        jobs: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.jobLoading = true;
        })
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.jobLoading = false;
            if (action.payload.success) {
                state.jobs = action.payload.jobs;
            } else {
                state.jobs = null;
            }
        })
        builder.addCase(getAllDelete.pending, (state, action) => {
            state.jobLoading = true;
        })
        builder.addCase(getAllDelete.fulfilled, (state, action) => {
            state.jobLoading = false;
            if (action.payload.success) {
                state.jobs = action.payload.jobs;
            } else {
                state.jobs = null;
            }
        })
        builder.addCase(deleteJob.pending, (state, action) => {
            state.jobLoading = true;
        })
        builder.addCase(deleteJob.fulfilled, (state, action) => {
            state.jobLoading = false;
        })
        builder.addCase(addJob.pending, (state, action) => {
            state.jobLoading = true;
        })
        builder.addCase(addJob.fulfilled, (state, action) => {
            console.log(action.payload)
            state.jobLoading = false;
        })
        builder.addCase(editJob.pending, (state, action) => {
            state.jobLoading = true;
        })
        builder.addCase(editJob.fulfilled, (state, action) => {
            state.jobLoading = false;
        })
    },
});

const jobReducer = jobSlice.reducer;

export const jobSelector = (state) => state.jobReducer;

// export const { } = jobSlice.actions

export default jobReducer;
