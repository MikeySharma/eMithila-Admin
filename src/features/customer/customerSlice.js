import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import customerService from './customerService';

export const getUsers = createAsyncThunk('customer/get-customers',async(thunkAPI)=>{
    try{
        return await customerService.getUsers();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})
const initialState = {
    customers: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}
   
export const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers:{},
    extraReducers:  (builder)=>{
        builder
        .addCase(getUsers.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getUsers.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.customers = action.payload;
        })
        .addCase(getUsers.rejected, (state, action)=>{
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
            state.customers = null;
        })
    }
})

export default customerSlice.reducer