import {base_url} from '../../utils/base_url';
import axios from 'axios';
import {config} from '../../utils/axiosConfig';
const getColors = async()=>{
    try{
        const response = await axios.get(`${base_url}color/`);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const addColor = async(data)=>{
    try{
       const response = await axios.post(`${base_url}color/`, data, config);
       return response.data;
    }catch(error){
        throw new Error(error);
    }
}
const deleteColor = async(id)=>{
    try{
       const response = await axios.delete(`${base_url}color/${id}`, config);
       return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const getAColor = async(id)=>{
    try{
        const response = await axios.get(`${base_url}color/${id}`);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const updateColor = async({colorId, value})=>{
    try{
        const response = await axios.put(`${base_url}color/${colorId}`, value, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const colorService = {
    getColors,
    addColor,
    deleteColor,
    getAColor,
    updateColor,
}
export default colorService