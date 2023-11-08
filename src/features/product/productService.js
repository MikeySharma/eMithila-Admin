import axios from "axios";
import { base_url } from "../../utils/base_url";
import {config} from '../../utils/axiosConfig';
const getProducts = async()=>{
    const response = await axios.get(`${base_url}product/`, config);
    return response.data;
}

const uploadProduct = async(data)=>{
    try{ 
        const response = await axios.post(`${base_url}product/`,data ,config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const deleteProduct = async(id)=>{
    try{
        const response = await axios.delete(`${base_url}product/${id}`, config);
        return response.data
    }catch(error){
        throw new Error(error);
    }
}

const getAProduct = async(id)=>{
    try{
        const response = await axios.get(`${base_url}product/${id}`);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const updateProduct = async({productId, value})=>{
    try{
        const response = await axios.put(`${base_url}product/${productId}`, value, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}
const productService = {
    getProducts,
    uploadProduct,
    deleteProduct,
    getAProduct,
    updateProduct,
}

export default productService;