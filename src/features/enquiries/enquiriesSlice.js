import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import enqsService from './enquiriesService';

export const getEnqs = createAsyncThunk('enq/get-enqs', async(thunkAPI)=>{
    try{
        return await enqsService.getEnqs() ;
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const delEnqs = createAsyncThunk('enq/del', async(id,thunkAPI)=>{
    try{
        return await enqsService.delEnqs(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})
export const getAEnq = createAsyncThunk('enq/get', async(id, thunkAPI)=>{
    try{
        return await enqsService.getAEnq(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateEnq = createAsyncThunk('enq/update', async(data, thunkAPI)=>{
    try{
        return await enqsService.updateEnq(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetEnq = createAction('Reset_all');


const initialState = {
    enqs : [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

const enqsSlice = createSlice({
    name: 'enqs',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getEnqs.pending, (state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getEnqs.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.enqs = action.payload;
        })
        .addCase(getEnqs.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.enqs = null;
        })
        .addCase(delEnqs.pending, (state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(delEnqs.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedEnq = action.payload;
            state.message = 'Deleted';
        })
        .addCase(delEnqs.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.enqs = null;
        })
        .addCase(getAEnq.pending, (state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getAEnq.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.getEnq = action.payload;
            state.message = 'success';
        })
        .addCase(getAEnq.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.enqs = null;
        }) 
        .addCase(updateEnq.pending, (state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(updateEnq.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedEnq = action.payload;
            state.message = 'success';
        })
        .addCase(updateEnq.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.enqs = null;
        })
        .addCase(resetEnq, ()=> initialState);
    }
})

export default enqsSlice.reducer