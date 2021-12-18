import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import staffApi from '../../api/staffApi';


export const getAll = createAsyncThunk('staff/getAll', async (filter = '') => {
    const response = await staffApi.getAll(filter)
    return response
});

export const getAllDelete = createAsyncThunk('staff/getAllDelete', async (filter = '') => {
    const response = await staffApi.getAllDelete(filter)
    return response
});

export const login = createAsyncThunk('staff/login', async (staffForm) => {
    const response = await staffApi.login(staffForm)
    return response
});

export const load = createAsyncThunk('staff/load', async () => {
    const response = await staffApi.load()
    return response
});

export const addStaff = createAsyncThunk('staff/addStaff', async (staffForm) => {
    const response = await staffApi.add(staffForm)
    return response
});

export const editStaff = createAsyncThunk('staff/editStaff', async ({ id, staffForm }) => {
    const response = await staffApi.edit(id, staffForm)
    return response
});

export const deleteStaff = createAsyncThunk('staff/deleteStaff', async (id) => {
    const response = await staffApi.delete(id)
    return response
});

export const deleteMultiStaff = createAsyncThunk('staff/deleteMultiStaff', async (ids) => {
    const response = await staffApi.deleteMulti(ids)
    return response
});

export const restore = createAsyncThunk('staff/restore', async (id) => {
    const response = await staffApi.restore(id)
    return response
});

export const restoreMulti = createAsyncThunk('staff/restoreMulti', async (ids) => {
    const response = await staffApi.restoreMulti(ids)
    return response
});

const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        staffLoading: false,
        staffs: null,
        staff: null
    },
    reducers: {
        logout(state, action) {
            localStorage.removeItem('User')
            state.staff = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.staffLoading = true;
        })
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.staffLoading = false;
            if (action.payload.success) {
                state.staffs = action.payload.staffs
            } else {
                state.staffs = null;
            }
        })
        builder.addCase(getAllDelete.pending, (state, action) => {
            state.staffLoading = true;
        })
        builder.addCase(getAllDelete.fulfilled, (state, action) => {
            state.staffLoading = false;
            if (action.payload.success) {
                state.staffs = action.payload.staffs
            } else {
                state.staffs = null;
            }
        })
        builder.addCase(login.pending, (state, action) => {
            state.staffLoading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.staffLoading = false;
            if (action.payload.success) {
                localStorage.setItem(
                    'User',
                    action.payload.accessToken
                )
            } else {
                state.staff = null
            }
        })
        builder.addCase(load.pending, (state, action) => {
            state.staffLoading = true;
        })
        builder.addCase(load.fulfilled, (state, action) => {
            state.staffLoading = false;
            if (action.payload.success) {
                state.staff = action.payload.staff
            } else {
                state.staff = null
            }
        })

        builder.addCase(deleteStaff.pending, (state, action) => {
            state.staffLoading = true;
        })
        builder.addCase(deleteStaff.fulfilled, (state, action) => {
            state.staffLoading = false;
        })
        builder.addCase(addStaff.pending, (state, action) => {
            state.staffLoading = true;
        })
        builder.addCase(addStaff.fulfilled, (state, action) => {
            state.staffLoading = false;
        })
        builder.addCase(editStaff.pending, (state, action) => {
            state.staffLoading = true;
        })
        builder.addCase(editStaff.fulfilled, (state, action) => {
            state.staffLoading = false;
        })
    },
});

const staffReducer = staffSlice.reducer;

export const staffSelector = (state) => state.staffReducer;

export const { logout } = staffSlice.actions;

export default staffReducer;
