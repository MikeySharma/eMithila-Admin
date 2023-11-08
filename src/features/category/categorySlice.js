import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export const getCategory = createAsyncThunk('category', async(thunkAPI)=>{
    try{
        return await categoryService.getCategory();

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})
export const addCategory = createAsyncThunk('category/add', async(data, thunkAPI)=>{
    try{
        return categoryService.addCategory(data);
    }catch(error){
        throw new Error(error);
    }
})

export const deleteCategory = createAsyncThunk('category/del', async(id,thunkAPI)=>{
    try{
        return await categoryService.deleteCategory(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getACategory = createAsyncThunk('category/get', async(id, thunkAPI)=>{
    try{
        return await categoryService.getACategory(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateCategory = createAsyncThunk('category/update', async(data, thunkAPI)=>{
    try{
        return await categoryService.updateCategory(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetCat = createAction('Reset_all');

const initialState ={
    categories: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getCategory.pending, (state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getCategory.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.categories = action.payload;

        })
        .addCase(getCategory.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.categories = null;
            state.message = action.error;
        })
        .addCase(addCategory.pending ,(state)=>{
            state.isLoading = true;
             state.isSuccess = false;
            state.isError = false;
        })
        .addCase(addCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = 'success';
            state.newCat = action.payload;

        })
        .addCase(addCategory.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteCategory.pending, (state)=>{
            state.isLoading = true;
             state.isSuccess = false;
            state.isError = false;
        })
        .addCase(deleteCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'Deleted';
            state.deletedCat = action.payload;

        })
        .addCase(deleteCategory.rejected, (state ,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getACategory.pending, (state)=>{
            state.isLoading = true;
             state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getACategory.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.getCat = action.payload;

        })
        .addCase(getACategory.rejected, (state ,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
         .addCase(updateCategory.pending, (state)=>{
            state.isLoading = true;
             state.isSuccess = false;
            state.isError = false;
        })
        .addCase(updateCategory.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.uploadCat = action.payload;

        })
        .addCase(updateCategory.rejected, (state ,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetCat, ()=> initialState);
    }
})

export default categorySlice.reducer