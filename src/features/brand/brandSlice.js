import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import brandService from '../brand/brandService';

export const getBrands = createAsyncThunk('brand/get-brands', async(thunkAPI)=>{
    try{
        return await brandService.getBrands();

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const addBrand = createAsyncThunk('brand/add', async(data,thunkAPI)=>{
    try{
       return await brandService.addBrand(data)
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteBrand = createAsyncThunk('brand/del', async(id, thunkAPI)=>{
    try{
        return await brandService.deleteBrand(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getABrand = createAsyncThunk('brand/get-brand', async(id, thunkAPI)=>{
    try{
        return await brandService.getABrand(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateBrand = createAsyncThunk('brand/update', async(data, thunkAPI)=>{
    try{
        return await brandService.updateBrand(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetBrand = createAction('Reset_all');
const initialState = {
    brands: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

 const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getBrands.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getBrands.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.brands = action.payload;
            
        })
        .addCase(getBrands.rejected, (state, action)=>{
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = action.error;
            state.brands = null;
        })
        .addCase(addBrand.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addBrand.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = 'success';
            state.newBrand = action.payload;
        })
        .addCase(addBrand.rejected, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteBrand.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteBrand.fulfilled, (state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.deletedBrand = action.payload;
            
        })
        .addCase(deleteBrand.rejected, (state,action)=>{
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = action.error;
        })
         .addCase(getABrand.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getABrand.fulfilled, (state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.getBrand = action.payload.title;
        })
        .addCase(getABrand.rejected, (state,action)=>{
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(updateBrand.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateBrand.fulfilled, (state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.updatedBrand = action.payload;
        })
        .addCase(updateBrand.rejected, (state,action)=>{
            state.isSuccess = false;
            state.isError = true;
            state.isLoading = false;
            state.message = action.error;
        })
        .addCase(resetBrand, () => initialState);
    }
})

export default brandSlice.reducer;