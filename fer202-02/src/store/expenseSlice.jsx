import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchExpenses = createAsyncThunk("expenses/fetch", async (userId) => {
  const res = await api.get(`/expenses?userId=${userId}`);
  return res.data;
});

export const addExpense = createAsyncThunk("expenses/add", async (expense) => {
  const res = await api.post("/expenses", expense);
  return res.data;
});

export const updateExpense = createAsyncThunk("expenses/update", async (expense) => {
  const res = await api.put(`/expenses/${expense.id}`, expense);
  return res.data;
});

export const deleteExpense = createAsyncThunk("expenses/delete", async (id) => {
  await api.delete(`/expenses/${id}`);
  return id;
});

const expenseSlice = createSlice({
  name: "expenses",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(addExpense.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const idx = state.list.findIndex(e => e.id === action.payload.id);
        if (idx >= 0) state.list[idx] = action.payload;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.list = state.list.filter(e => e.id !== action.payload);
      });
  }
});

export default expenseSlice.reducer;
