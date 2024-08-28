import axios from "axios"
import { env } from "./environment";

const base_url = `${env}/category`

export const addCategory = async (data) => {

    const response = await axios.post(`${base_url}/add`, data);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return [];
    }

}

export const getAllCategory = async () => {

    const response = await axios.get(`${base_url}/all`);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return [];
    }

}

export const updateCategory = async (id, data) => {

    console.log(data)

    const response = await axios.put(`${base_url}/${id}/update`, data);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return [];
    }

}

export const deleteCategory = async (id) => {

    const response = await axios.delete(`${base_url}/${id}/delete`);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return [];
    }

}

export const getSingleCategory = async (id) => {

    const response = await axios.get(`${base_url}/${id}`);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return [];
    }

}