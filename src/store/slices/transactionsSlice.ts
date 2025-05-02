import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "@/services/api";

interface Transaction {
    transaction_number: string;
    description: string;
    bank_description: string;
    transaction_type: string;
    amount: {
        currency: string;
        value: number;
    };
    origin: string;
    destination: string;
}

interface TransactionsState {
    loading: boolean;
    error: string | null;
    items: Transaction[];
}

const initialState: TransactionsState = {
    loading: false,
    error: null,
    items: [],
};

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async () => {
        const response = await api.get(`/accounts/8b64e75b-d45c-4a86-8ada-141c7635133a/transactions`);
        return response.data.items;
    }
);

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default transactionsSlice.reducer;