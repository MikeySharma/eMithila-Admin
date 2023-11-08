import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import uploadService from './uploadService';

export const uploadImg = createAsyncThunk('upload/img', async (data, thunkAPI) => {
    try {
        const formData = new FormData();
        data.forEach((elem) => {
            formData.append("images", elem);
        })
        return await uploadService.uploadImg(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const uploadBlogImg = createAsyncThunk('upload/blogImg', async(data, thunkAPI)=>{
    try{
        const formData = new FormData();
        data.forEach((elem)=>{
            formData.append("images", elem);
        })
        return await uploadService.uploadBlogImg(formData);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteImg = createAsyncThunk('upload/deleteImg', async (id, thunkAPI) => {
    try {
        return await uploadService.deleteImg(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
export const resetUpload = createAction('Reset_all');
const initialState = {
    images: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}



const uploadSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImg.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            state.isError = false;
            })
            .addCase(uploadImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productImages = action.payload;
                state.message = 'success';
            })
            .addCase(uploadImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.productImages = null;
                state.message = action.error;
            })
            .addCase(uploadBlogImg.pending, (state)=>{
                state.isLoading = true;
                state.isSuccess = false;
            state.isError = false;
            })
            .addCase(uploadBlogImg.fulfilled, (state,action)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogImages = action.payload;
                state.message = 'success';
            })
            .addCase(uploadBlogImg.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.blogImages = null;
                state.message = action.error;
            })
            .addCase(deleteImg.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            state.isError = false;
            })
            .addCase(deleteImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload.message;
                state.images = null;
                state.blogImages = null;

            })
            .addCase(deleteImg.rejected, (state,action)=>{
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
                state.images = null;
            })
            .addCase(resetUpload, () => initialState)
    }
})

export default uploadSlice.reducer