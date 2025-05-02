import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '@/services/api';

export const fetchAccountDetail = createAsyncThunk('account/fetchBalance', async () => {
    const response = await api.get('accounts/8b64e75b-d45c-4a86-8ada-141c7635133a');
    return response.data;
});

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        detail: null,
        loading: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAccountDetail.pending, state => {
                state.loading = true;
            })
            .addCase(fetchAccountDetail.fulfilled, (state, action) => {
                state.detail = action.payload;
                state.loading = false;
            })
            .addCase(fetchAccountDetail.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default accountSlice.reducer;