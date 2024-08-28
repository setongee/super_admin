import axios from "axios"
import { env } from "./environment";

const base_url = `${env}/executives`

export const addCouncilMember = async (data) => {

    const response = await axios.post(`${base_url}/add`, data);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return [];
    }

}

export const getAllMembers = async () => {

    const response = await axios.get(`${base_url}/get/all`);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return [];
    }

}

export const getSingleMember = async (id) => {

    const response = await axios.get(`${base_url}/view/${id}`);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return [];
    }

}

export const updateMember = async (id, data) => {

    const response = await axios.put(`${base_url}/update/${id}`, data);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return [];
    }

}

export const deleteMember = async (id) => {

    const response = await axios.delete(`${base_url}/delete/${id}`);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return [];
    }

}

