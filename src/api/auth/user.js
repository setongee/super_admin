import axios from "axios"
import { env } from "../environment";

const base_url = `${env}/admin`

export const addSingleUser = async (data) => {

    const response = await axios.post(`${base_url}/register`, data);
    
    if(response.status === 200) {

        return response.data;
        
    }else {
        return {status : "bad", message : "something went wrong!"}
    }
}

export const getSingleUser = async (id) => {

    const response = await axios.get(`${base_url}/user/${id}`);
    
    if(response.status === 200) {

        return response.data.data;
        
    }else {
        return {status : "bad", message : "something went wrong!"}
    }
}

export const getAllUsers = async (id) => {

    const response = await axios.get(`${base_url}/users`);
    
    if(response.status === 200) {

        return response.data;
        
    }else {
        return {status : "bad", message : "something went wrong!"}
    }
}


export const deleteSingleUser = async (id) => {

    const response = await axios.delete(`${base_url}/user/${id}`);
    
    if(response.status === 200) {

        return response.data;
        
    }else {
        return {status : "bad", message : "something went wrong!"}
    }
}


export const changePassword = async (id, password, newPassword) => {

    const response = await axios.post(`${base_url}/user/auth/password/${id}`, {password, newPassword});


    if(response.status === 200) {

        return response.data;
        
    }else {
        return {status : "bad", message : "something went wrong!"}
    }

}