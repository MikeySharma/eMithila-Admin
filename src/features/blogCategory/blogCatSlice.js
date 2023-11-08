import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import blogCatService from './blogCatService';

export const getBlogCatList = createAsyncThunk('blog-cat/get',async(thunkAPI)=>{
    try{
        return await blogCatService.getBlogCatList();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const addBlogCat = createAsyncThunk('blog-cat/add', async(data,thunkAPI)=>{
    try{
        return await blogCatService.addBlogCat(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteBlogCat = createAsyncThunk('blog-cat/delete', async(id, thunkAPI)=>{
    try{
        return await blogCatService.deleteBlogCat(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getABlogCat = createAsyncThunk('blog-cat/getOne', async(id, thunkAPI)=>{
    try{
        return await blogCatService.getABlogCat(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateBlogCat = createAsyncThunk('blog-cat/update', async(data, thunkAPI)=>{
    try{
        return await blogCatService.updateBlogCat(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetBlogCat = createAction('Reset_all');
const initialState = {
    blogCats : [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

const blogCatSlice = createSlice({
    name: 'blogCats',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getBlogCatList.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getBlogCatList.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.blogCats = action.payload;
        })
        .addCase(getBlogCatList.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.blogCats = null;
        })
        .addCase(addBlogCat.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addBlogCat.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = 'success';
            state.addedBlogCat = action.payload;
        })
        .addCase(addBlogCat.rejected, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(deleteBlogCat.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(deleteBlogCat.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = 'Deleted';
            state.deletedBlogCat = action.payload;
        })
        .addCase(deleteBlogCat.rejected, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getABlogCat.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getABlogCat.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = 'Deleted';
            state.getBlogCat = action.payload.title;
        })
        .addCase(getABlogCat.rejected, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateBlogCat.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(updateBlogCat.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = 'Deleted';
            state.updatedBlogCat = action.payload;
        })
        .addCase(updateBlogCat.rejected, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetBlogCat, ()=> initialState);

    }
})

export default blogCatSlice.reducer;