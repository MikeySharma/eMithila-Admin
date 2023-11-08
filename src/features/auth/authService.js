import axios from 'axios';
import { base_url } from '../../utils/base_url';
import {config} from '../../utils/axiosConfig';

const login = async(userData)=>{
    const response = await axios.post(`${base_url}user/admin-login`,userData )

    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data;
}
const getOrders = async()=>{
    try{
        const response = await axios.get(`${base_url}user/get-orders`, config)
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const getAOrder = async(id)=>{
    try{
        const response = await axios.get(`${base_url}user/get-order/${id}`, config)
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}


const authService ={
    login,
    getOrders,
    getAOrder,
}
export default authService