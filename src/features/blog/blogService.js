import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axiosConfig';
const getBlogs = async()=>{
    try{
        const response = await axios.get(`${base_url}blog/get-all-blogs`);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const addBlog = async(data)=>{
    try{
        const response =  await axios.post(`${base_url}blog/create-blog`, data, config)
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const deleteBlog = async(id)=>{
    try{
        const response = await axios.delete(`${base_url}blog/delete-blog/${id}`, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const getABlog = async(id)=>{
    try{
        const response = await axios.get(`${base_url}blog/get-blog/${id}`)
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}
const updateBlog = async({blogId, value})=>{
    try{
        const response = await axios.put(`${base_url}blog/update-blog/${blogId}`, value, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const blogService = {
    getBlogs,
    addBlog,
    deleteBlog,
    getABlog,
    updateBlog,
}

export default blogService;