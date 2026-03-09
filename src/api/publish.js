import axios from "axios";
import { env } from "./environment";
const base_url = `${env}/publish-bucket`;

export const getAllPublishedPages = async () => {
  const response = await axios.get(`${base_url}/get/all`);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

export const updateDraft = async (id, data) => {
  const response = await axios.put(`${base_url}/update/${id}`, data);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};
