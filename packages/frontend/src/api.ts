import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL;

export async function postData(text: string) {
  try {
    const response = await axios.post(url, {message: text});
    const data = response.data;

    return data;

  } catch (error) {
    console.log(error);
  }
}