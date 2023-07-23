import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const apiUrl = process.env.REACT_APP_BE_URL;
export async function saveBookingApi(data) {
  try {
    if (!data || !data.payload) {
      throw new Error("Invalid data object");
    }
    const response = await axios.post(
      `${apiUrl}/booking`,
      {
        id: uuidv4,
        ...data.payload,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error saving booking:", error);
    throw error;
  }
}
export async function fetchBookings() {
  try {
    const response = await axios.get(`${apiUrl}/booking`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetch booking:", error);
    throw error;
  }
}
export async function editBookingApi(data) {
  try {
    const id = data.id;
    const response = await axios.put(`${apiUrl}/booking/${id}`, { ...data }, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error editing booking:", error);
    throw error;
  }
}
