import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customer/customerSlice';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brand/brandSlice';
import categoryReducer from '../features/category/categorySlice';
import colorReducer from '../features/color/colorSlice';
import enqReducer from '../features/enquiries/enquiriesSlice';
import blogReducer from '../features/blog/blogSlice';
import blogCatReducer from '../features/blogCategory/blogCatSlice';
import uploadReducer from '../features/upload/uploadSlice';
import immutableConfig from '../utils/immutableConfig';
import couponReducer from '../features/coupon/couponSlice';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        category: categoryReducer,
        color: colorReducer,
        enq: enqReducer,
        blog: blogReducer,
        blogCat : blogCatReducer,
        upload: uploadReducer,
        coupon: couponReducer,
},middleware: immutableConfig,
})