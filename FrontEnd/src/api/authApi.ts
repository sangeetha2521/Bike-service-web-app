import axios from "axios";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
const apiUrl = process.env.REACT_APP_BE_URL;

export async function fetchUser() {
  try {
    const response = await axios.get(`${apiUrl}/user/currentUser`, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

export async function signUpUserApi(data) {
  try {
    const response = await axios.post(`${apiUrl}/user/signUp`, { id: uuidv4, ...data }, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error while signup:", error);
    throw error;
  }
}
export async function loginUserApi(data) {
  try {
    const response = await axios.post(`${apiUrl}/user/login`, data.payload, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error while login:", error);
    throw error;
  }
}
export async function logoutApi() {
  try {
    const response = await axios.post(`${apiUrl}/user/logout`, null, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error while logout:", error);
    throw error;
  }
}
