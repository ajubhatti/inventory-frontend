import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get('/api/inventory', {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default inventorySlice.reducer;
