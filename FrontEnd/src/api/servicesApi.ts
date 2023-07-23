import axios from "axios";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

const apiUrl = process.env.REACT_APP_BE_URL;
export async function fetchServices() {
  try {
    const response = await axios.get(`${apiUrl}/services`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
}
export async function fetchService(id) {
  try {
    const response = await axios.get(`${apiUrl}/services/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching service:", error);
  }
}

export async function createServiceApi(data) {
  try {
    if (!data || !data.payload || !data.payload.data) {
      throw new Error("Invalid data object");
    }
    const response = await axios.post(
      `${apiUrl}/services`,
      {
        id: uuidv4,
        ...data.payload.data,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error create service:", error);
    throw error;
  }
}
export async function deleteServiceApi(data) {
  try {
    if (!data || !data.payload) {
      throw new Error("Invalid data object");
    }
    const response = await axios.delete(`${apiUrl}/services/${data.payload}`, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error delete service:", error);
    throw error;
  }
}
export async function editServiceApi(data) {
  try {
    if (!data || !data.payload) {
      throw new Error("Invalid data object");
    }

    const id = data.payload._id;
    delete data.payload._id;
    const response = await axios.put(
      `${apiUrl}/services/${id}`,
      {
        ...data.payload,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error edit service:", error);
    throw error;
  }
}
