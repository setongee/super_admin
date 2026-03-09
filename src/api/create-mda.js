import axios from "axios";
import { env } from "./environment";

const base_url = `${env}`;

export const createMda = async (data) => {
  const response = await axios.post(`${base_url}/create-mdas/create`, data);
  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

export const deleteSingleMda = async (id) => {
  const response = await axios.delete(`${base_url}/directory/delete/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    return "There is an issue!";
  }
};

export const updateMda = async (id, data) => {
  console.log(data);
  const response = await axios.put(
    `${base_url}/create-mdas/update/${id}`,
    data,
  );

  if (response.status === 200) {
    return response.data;
  } else {
    return "There is an issue!";
  }
};
