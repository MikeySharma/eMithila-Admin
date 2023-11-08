import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axiosConfig';

const getBlogCatList = async()=>{
    try{
        const response = await axios.get(`${base_url}blog-category/`);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}
const addBlogCat = async(data)=>{
    try{
      const response = await axios.post(`${base_url}blog-category/`, data, config)
      return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const deleteBlogCat = async(id)=>{
    try{
       const response =await axios.delete(`${base_url}blog-category/${id}`, config);
       return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const getABlogCat = async(id)=>{
    try{
        const response = await axios.get(`${base_url}blog-category/${id}`);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const updateBlogCat = async({blogCatId, value}) =>{
    try{
        const response = await axios.put(`${base_url}blog-category/${blogCatId}`, value, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const blogCatService = {
    getBlogCatList,
    addBlogCat,
    deleteBlogCat,
    getABlogCat,
    updateBlogCat,
}

export default blogCatService;