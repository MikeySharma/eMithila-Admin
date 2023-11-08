import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axiosConfig';
const getBrands = async()=>{
   try{
       const response = await axios.get(`${base_url}brand-category/`);
       return response.data;

   }catch(error){
    throw new Error(error);
   }
  
}

const addBrand = async(data)=>{
    try{
        const response = await axios.post(`${base_url}brand-category/`,data, config);
        return response.data;

    }catch(error){
        throw new Error(error);
    }
}
const deleteBrand = async(id)=>{
    try{
       const response =  await axios.delete(`${base_url}brand-category/${id}`, config);
       return response.data;
    }catch(error){
        throw new Error(error);
    }
}
const getABrand = async(id)=>{
    try{
      const response =  await axios.get(`${base_url}brand-category/${id}`);
      return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const updateBrand = async({brandId, value})=>{
    try{
        const response = await axios.put(`${base_url}brand-category/put/${brandId}`,value, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const brandService = {
    getBrands,
    addBrand,
    getABrand,
    deleteBrand,
    updateBrand,
}
export default brandService