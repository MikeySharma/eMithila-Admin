import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import couponService from './couponService';

export const getCoupons = createAsyncThunk('coupon/get', async(thunkAPI)=>{
    try{
        return await couponService.getCoupons();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const addCoupons = createAsyncThunk('coupon/add', async(data, thunkAPI)=>{
    try{
        return await couponService.addCoupons(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteCoupon = createAsyncThunk('coupon/del', async(id, thunkAPI)=>{
    try{
        return await couponService.deleteCoupon(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getACoupon = createAsyncThunk('coupon/getOne', async(id,thunkAPI)=>{
    try{
        return await couponService.getACoupon(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateCoupon = createAsyncThunk('coupon/update', async(data, thunkAPI)=>{
    try{
        return await couponService.updateCoupon(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetCoupon = createAction('Reset_all');


const initialState = {
    coupons: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getCoupons.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getCoupons.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.coupons = action.payload;
        })
        .addCase(getCoupons.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.coupons = null;
        })
        .addCase(addCoupons.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addCoupons.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.createdCoupon = action.payload;
        })
        .addCase(addCoupons.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.addedCoupon = null;
        })
        .addCase(deleteCoupon.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteCoupon.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'Deleted';
            state.deletedCoupon = action.payload;
        })
        .addCase(deleteCoupon.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getACoupon.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getACoupon.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.getCouponExpiry = action.payload.expiry;
            state.getCouponName = action.payload.name;
            state.getCouponDiscount = action.payload.discount;
        })
        .addCase(getACoupon.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateCoupon.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateCoupon.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.updatedCoupon = action.payload;
        })
        .addCase(updateCoupon.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetCoupon, ()=> initialState);
    }
})

export default couponSlice.reducer;