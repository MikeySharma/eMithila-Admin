import { base_url } from '../../utils/base_url';
import axios from 'axios';
import { config } from '../../utils/axiosConfig';

const uploadImg = async (formData) => {
    try {
        const response = await axios.put(`${base_url}upload/`, formData, config);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
const uploadBlogImg = async (data) => {
    try {
        const response = await axios.put(`${base_url}upload/blog`, data, config);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteImg = async (id) => {
    try {
        const response = await axios.delete(`${base_url}upload/delete-img/${id}`, config);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
const uploadService = {
    uploadImg,
    uploadBlogImg,
    deleteImg,
}

export default uploadService;