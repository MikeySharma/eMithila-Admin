import {base_url} from '../../utils/base_url';
import axios from 'axios';
import {config} from '../../utils/axiosConfig';
const getEnqs = async()=>{
    try{
        const response = await axios.get(`${base_url}enquiry/`, config)
        return response.data;
    }catch(error){
        throw new Error(error);
    }
        
}
const delEnqs = async(id)=>{
    try{
       const response = await axios.delete(`${base_url}enquiry/${id}`, config);
       return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const getAEnq = async(id)=>{
    try{
        const response = await axios.get(`${base_url}enquiry/${id}`, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}
const updateEnq = async(data)=>{
    try{
        const response = await axios.put(`${base_url}enquiry/${data.id}`, {status : data.status}, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const enqsService = {
    getEnqs,
    delEnqs,
    getAEnq,
    updateEnq,
}

export default enqsService;