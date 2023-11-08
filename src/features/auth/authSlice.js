import {createSlice, createAsyncThunk,} from '@reduxjs/toolkit';
import authService from './authService';


const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const initialState = {
    user: getUserFromLocalStorage,
    orders: [],
    getOrder: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const login = createAsyncThunk('auth/admin-login',async(user,thunkAPI)=>{
    try{
        return await authService.login(user);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})
export const getOrders = createAsyncThunk('order/get', async(thunkAPI)=>{
    try{
        return await authService.getOrders();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getAOrder = createAsyncThunk('order/get-one', async(id,thunkAPI)=>{
    try{
        return await authService.getAOrder(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

 const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(login.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.user = null;
            state.message = action.error;
        })
        .addCase(getOrders.pending, (state)=>{
            state.isLoading = true; 
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getOrders.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.orders = action.payload;
        })
        .addCase(getOrders.rejected, (state,action)=>{
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.orders = null;
            state.message = action.error;
        })
         .addCase(getAOrder.pending, (state)=>{
            state.isLoading = true; 
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getAOrder.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.getOrder = action.payload;
        })
        .addCase(getAOrder.rejected, (state,action)=>{
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.getOrder = null;
            state.message = action.error;
        })
    },
})

export default authSlice.reducer;