import axios from 'axios';
import { Post } from './types';
import { GetDataException } from './exceptions';

// Function to get data from the API
export const getData = async (url: string): Promise<Post> => {
  try {
    const response = await axios.get<Post>(url);
    return response.data;
  } catch (error) {
    handleGetDataError(error);
  }
};

// Function to handle errors
const handleGetDataError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error(
        'Server Error:',
        error.response.status,
        error.response.data
      );
      throw new GetDataException(`Server error: ${error.response.status}`);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.message);
      throw new GetDataException('Network error: No response received');
    } else {
      // Something happened in setting up the request
      console.error('Request Error:', error.message);
      throw new GetDataException(`Request error: ${error.message}`);
    }
  } else {
    // Non-Axios error
    console.error('Unexpected Error:', error);
    throw new GetDataException(`Unexpected error: ${error}`);
  }
};
