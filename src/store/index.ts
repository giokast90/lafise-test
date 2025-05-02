import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import transactionsReducer from './slices/transactionsSlice';
import transferReducer from './slices/transferSlice';

const store = configureStore({
    reducer: {
        account: accountReducer,
        transactions: transactionsReducer,
        transfer: transferReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;