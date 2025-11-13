// src/features/payments/paymentsSlice.js
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// Async action: Tạo thanh toán mới
export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });

      if (response.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }

      if (!response.ok) throw new Error('Không thể tạo thanh toán');

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  payments: [],
  isLoading: false,
  error: null
};

// Slice chính
const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default paymentsSlice.reducer;

// Selector: chỉ lấy các thanh toán thành công
export const selectSuccessfulPayments = createSelector(
  (state) => state.payments.payments,
  (payments) => payments.filter(p => p.status === 'SUCCESS')
);
