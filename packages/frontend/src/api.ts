import axios, { AxiosResponse } from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export async function postData(text: string) {
  try {
    const response: AxiosResponse = await axios.post(url, {message: text});
    const data = response.data;

    return data;

  } catch (error: any) {
    console.error(`Error in postData function: ${error.message}`);
    throw error;
  }
}