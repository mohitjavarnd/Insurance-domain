
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  policies: [],
  categories: [], 
  status: 'idle',
  error: null,
};

export const fetchPolicies = createAsyncThunk('policies/fetchPolicies', async () => {
  const response = await axios.get('https://653156964d4c2e3f333cdc4b.mockapi.io/insurance/Insurance-policies');
  return response.data;
});

const policiesSlice = createSlice({
  name: 'policies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.policies = action.payload;
        
        const categories = action.payload.map(policy => policy.category);
        state.categories = Array.from(new Set(categories)); 
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default policiesSlice.reducer;
