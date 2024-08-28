import axios from "axios"
import { env } from "./environment";

const base_url = `${env}/mdas`


const getAllMdas = async () => {

    const response = await axios.get(`${base_url}/all`);
    
    if ( response.status === 200 ) {

        let sortData = response.data.sort((a, b) => a.subdomain.toLowerCase().localeCompare(b.subdomain.toLowerCase(), 'en', { sensitivity: 'accent' }));

        return sortData;

     }

     else {
         return [];
     }

}

const getSingleMda = async (id) => {

    const response = await axios.get(`${base_url}/${id}`);

     if ( response.status === 200 ) {

        return response.data;

    } 
    
    else{

        return [];

    }

}

const addSingleMda = async (data) => {

    const response = await axios.post(`${base_url}/add`, data);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return "There is an issue!";
    }

}

const updateSingleMda = async (id, data) => {

    const response = await axios.put(`${base_url}/update/${id}`, data);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return "There is an issue!";
    }

}

const deleteSingleMda = async (id) => {

    const response = await axios.delete(`${base_url}/delete/${id}`);
    
    if(response.status === 200) {
        return response.data;
    } else{
        return "There is an issue!";
    }

}


export {

    getSingleMda,
    getAllMdas,
    addSingleMda,
    updateSingleMda,
    deleteSingleMda
    
}