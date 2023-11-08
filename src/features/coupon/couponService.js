import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axiosConfig';

const getCoupons = async()=>{
    try{
        const response = await axios.get(`${base_url}coupon/`, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}
const addCoupons = async(data)=>{
    try{
        const response = await axios.post(`${base_url}coupon/`, data, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}
const deleteCoupon = async(id)=>{
    try{
       const response =  await axios.delete(`${base_url}coupon/${id}`,config);
       return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const getACoupon = async(id)=>{
    try{
        const response = await axios.get(`${base_url}coupon/${id}`, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const updateCoupon = async({couponId, value})=>{
    try{
        const response = await axios.put(`${base_url}coupon/${couponId}`, value, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const couponService = {
    getCoupons,
    addCoupons,
    deleteCoupon,
    getACoupon,
    updateCoupon,
}

export default couponService;