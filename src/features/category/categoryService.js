import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axiosConfig';

const getCategory = async()=>{
    try{
        const response = await axios.get(`${base_url}product-category/`);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const addCategory = async(data)=>{
    try{
        const response = await axios.post(`${base_url}product-category/`, data, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const deleteCategory = async(id)=>{
    try{
       const response =  await axios.delete(`${base_url}product-category/${id}`, config);
       return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const getACategory = async(id)=>{
    try{
        const response = await axios.get(`${base_url}product-category/${id}`);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const updateCategory = async({catId,value})=>{
    try{
        const response = await axios.put(`${base_url}product-category/${catId}`, value, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}


const categoryService = {
    getCategory,
    addCategory,
    getACategory,
    updateCategory,
    deleteCategory,
}
export default categoryService