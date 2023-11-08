import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk('product/get-products', async(thunkAPI)=>{
    try{
        return await productService.getProducts();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const uploadProduct = createAsyncThunk('product/upload', async(data, thunkAPI)=>{
    try{
      return await productService.uploadProduct(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteProduct = createAsyncThunk('product/delete', async(id, thunkAPI)=>{
    try{
       return await productService.deleteProduct(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getAProduct = createAsyncThunk('product/get', async(id, thunkAPI)=>{
    try{
        return await productService.getAProduct(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateProduct = createAsyncThunk('product/update', async(data, thunkAPI)=>{
    try{
        return await productService.updateProduct(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetProduct = createAction('Reset_all');
export const resetgetPImage = createAction('Reset_pImage');

const initialState = {
    products: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:[],
    extraReducers: (builder)=>{
        builder
        .addCase(getProducts.pending, (state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getProducts.fulfilled, (state,action)=>{
            state.isSuccess = true;
            state.isLoading = false;
            state.isError = false;
            state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state,action)=>{
            state.isError = true;
            state.message = action.error;
            state.products = null;
        })
        .addCase(uploadProduct.pending, (state)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(uploadProduct.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "success";
            state.addedProduct = action.payload;
        })
        .addCase(uploadProduct.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteProduct.pending, (state)=>{
            state.isLoading = true;
             state.isSuccess = false;
            state.isError = false;
        })
        .addCase(deleteProduct.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "success";
            state.deletedProduct = action.payload;
        })
        .addCase(deleteProduct.rejected, (state,action)=>{
            state.isLoading =false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAProduct.pending, (state)=>{
            state.isLoading = true;
             state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getAProduct.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "success";
            state.getPTitle = action.payload.title;
            state.getPDesc = action.payload.description;
            state.getPPrice = action.payload.price;
            state.getPCategory = action.payload.category;
            state.getPBrand = action.payload.brand;
            state.getPTag = action.payload.tags;
            state.getPColor = action.payload.color;
            state.getPQuantity = action.payload.quantity;
            state.getPImage =action.payload.images;

        })
        .addCase(getAProduct.rejected, (state,action)=>{
            state.isLoading =false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateProduct.pending, (state)=>{
            state.isLoading = true;
             state.isSuccess = false;
            state.isError = false;
        })
        .addCase(updateProduct.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "success";
            state.updatedProduct = action.payload
        })
        .addCase(updateProduct.rejected, (state,action)=>{
            state.isLoading =false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetProduct, ()=> initialState)
        .addCase(resetgetPImage, (state)=>{
            state.getPImage = null;
        })
    }
})

export default productSlice.reducer;