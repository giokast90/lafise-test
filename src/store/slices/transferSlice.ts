import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';
import { RootState } from "@/store";

export interface TransferPayload {
    origin: string;
    destination: string;
    amount: {
        currency: string;
        value: number;
    };
}

export interface TransferState {
    loading: boolean;
    success: boolean;
    response: any;
    error: string | null;
}

const initialState: TransferState = {
    loading: false,
    success: false,
    response: null,
    error: null,
};

export const transferMoney = createAsyncThunk('transfer/money',
    async ({ origin, destination, amount }: TransferPayload) => {
        const response = await api.post(`transactions`, {
            origin,
            destination,
            amount,
        });
        return response.data;
    }
);

export const transferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        resetTransferState: (state) => {
            state.loading = false;
            state.success = false;
            state.response = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(transferMoney.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.response = null;
                state.error = null;
            })
            .addCase(transferMoney.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.response = action.payload;
            })
            .addCase(transferMoney.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload as string;
            });
    }
});

export const { resetTransferState } = transferSlice.actions;

export const selectTransfer = (state: RootState) => state.transfer;

export default transferSlice.reducer;