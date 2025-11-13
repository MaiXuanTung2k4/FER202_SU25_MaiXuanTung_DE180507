// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 🔹 Giả lập API: tạo danh sách người dùng mẫu
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  // Có thể giả lập delay nhẹ:
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { id: 1, name: 'Nguyễn Văn A', isAdmin: false },
    { id: 2, name: 'Trần Thị B', isAdmin: true },
    { id: 3, name: 'Phạm Văn C', isAdmin: false }
  ];
});

// 🔹 State khởi tạo
const initialState = {
  list: [],
  isLoading: false,
  error: null
};

// 🔹 Slice chính
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleAdminStatus: (state, action) => {
      const user = state.list.find(u => u.id === action.payload);
      if (user) user.isAdmin = !user.isAdmin;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { toggleAdminStatus } = usersSlice.actions;
export default usersSlice.reducer;
