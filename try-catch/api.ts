import axios from 'axios';
import { Post } from './types';
import { GetDataException } from './exceptions';

// Function to get data from the API
export const getData = async (url: string): Promise<Post> => {
  try {
    const response = await axios.get<Post>(url);
    return response.data;
  } catch (error) {
    throw new GetDataException(`Failed to fetch data: ${error.message}`);
  }
};
