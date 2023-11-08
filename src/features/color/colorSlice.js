import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColors = createAsyncThunk('colors', async(thunkAPI)=>{
    try{
        return await colorService.getColors();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const addColor= createAsyncThunk('colors/add', async(data, thunkAPI)=>{
    try{
        return  await colorService.addColor(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteColor = createAsyncThunk('colors/delete', async(id, thunkAPI)=>{
    try{
     return await colorService.deleteColor(id);   
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getAColor = createAsyncThunk('color/get', async(id, thunkAPI)=>{
    try{
        return await colorService.getAColor(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateColor = createAsyncThunk('color/update', async(data, thunkAPI)=>{
    try{
        return await colorService.updateColor(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetColor = createAction('Reset_all');

const initialState = {
    colors: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

const colorSlice = createSlice({
    name: 'colors',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getColors.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getColors.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.colors = action.payload;
        })
        .addCase(getColors.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.colors = null;
            state.message = action.error;
        })
        .addCase(addColor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addColor.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess  = true;
            state.addedColor = action.payload;
            state.message = 'success';
        })
        .addCase(addColor.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteColor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteColor.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess  = true;
            state.deletedColor = action.payload;
            state.message = 'Deleted';
        })
        .addCase(deleteColor.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
         .addCase(getAColor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAColor.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess  = true;
            state.message = 'success';
            state.getColor = action.payload.title;
        })
        .addCase(getAColor.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateColor.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateColor.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess  = true;
            state.message = 'success';
            state.updatedColor = action.payload.title;
        })
        .addCase(updateColor.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetColor, ()=> initialState)
    }
})

export default colorSlice.reducer;