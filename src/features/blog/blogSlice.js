import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import blogService from './blogService';

export const getBlogs = createAsyncThunk('blog/get-blogs',async(thunkAPI)=>{
    try{
        return await blogService.getBlogs();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const addBlog = createAsyncThunk('blog/add', async(data, thunkAPI)=>{
    try{
        return await blogService.addBlog(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteBlog = createAsyncThunk('blog/delete', async(id, thunkAPI)=>{
    try{
        return await blogService.deleteBlog(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getABlog = createAsyncThunk('blog/get', async(id, thunkAPI)=>{
    try{
        return await blogService.getABlog(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateBlog = createAsyncThunk('blog/update', async(data, thunkAPI)=>{
    try{
        return await blogService.updateBlog(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})
export const resetBlog = createAction('Reset_all');
export const resetgetBlogImage = createAction('Reset_blogImage');

const initialState = {
    blogs: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getBlogs.pending, (state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getBlogs.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.blogs = action.payload;
        })
        .addCase(getBlogs.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.blogs = null;
        })
        .addCase(addBlog.pending, (state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(addBlog.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.addedBlog = action.payload;
        })
        .addCase(addBlog.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteBlog.pending, (state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(deleteBlog.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBlog = action.payload;
        })
        .addCase(deleteBlog.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getABlog.pending, (state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getABlog.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.getBlogTitle = action.payload.title;
            state.getBlogDesc = action.payload.description;
            state.getBlogCat = action.payload.category;
            state.getBlogImage = action.payload.images ? action.payload.images : null;
        })
        .addCase(getABlog.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateBlog.pending, (state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(updateBlog.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBlog = action.payload;
        })
        .addCase(updateBlog.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetBlog, ()=> initialState)
        .addCase(resetgetBlogImage, (state)=>{
            state.getBlogImage = null;
        })
    }
})

export default blogSlice.reducer;