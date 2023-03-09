import axios from 'axios';

const url = import.meta.env.BACKEND_URL + "/api";

export async function postData(text: string) {
  try {
    const response = await axios.post(url, {message: text});
    const data = response.data;

    return data;

  } catch (error) {
    console.log(error);
  }
}