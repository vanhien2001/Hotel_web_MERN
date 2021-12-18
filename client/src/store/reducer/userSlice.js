import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const register = createAsyncThunk('user/register', async (userform) => {
    const response = await userApi.register(userform)
    return response;
});

export const login = createAsyncThunk('user/login', async (userform) => {
    const response = await userApi.login(userform)
    return response;
});

export const load = createAsyncThunk('user/load', async () => {
    const response = await userApi.load()
    return response;
});

export const changePass = createAsyncThunk('user/changePass', async (userform) => {
    const response = await userApi.changePass(userform)
    return response;
});

export const changeInfor = createAsyncThunk('user/changeInfor', async (userform) => {
    const response = await userApi.changeInfor(userform)
    return response;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        authLoading: false,
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        logout(state, action) {
            localStorage.removeItem('User')
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.authLoading = true;
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.authLoading = false;
            if (action.payload.success) {
                localStorage.setItem(
                    'User',
                    action.payload.accessToken
                )
            } else {
                state.user = null
            }
        })

        builder.addCase(login.pending, (state, action) => {
            state.authLoading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.authLoading = false;
            if (action.payload.success) {
                localStorage.setItem(
                    'User',
                    action.payload.accessToken
                )
            } else {
                state.user = null
            }
        })
        builder.addCase(load.pending, (state, action) => {
            state.authLoading = true;
        })
        builder.addCase(load.fulfilled, (state, action) => {
            state.authLoading = false;
            if (action.payload.success) {
                state.user = action.payload.user
            } else {
                state.user = null
            }
        })
    },
});

const userReducer = userSlice.reducer;

export const userSelector = (state) => state.userReducer;

export const { logout } = userSlice.actions;

export default userReducer;
