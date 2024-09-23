import axios from 'axios';

// Sample API endpoint
const url = 'https://jsonplaceholder.typicode.com/posts/1';

// Define an interface for the response data
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Custom exception classes
class GetDataException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GetDataException';
  }
}

class ProcessDataException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProcessDataException';
  }
}

// Function to get data from the API
const getData = async (url: string): Promise<Post> => {
  try {
    const response = await axios.get<Post>(url);
    return response.data;
  } catch (error) {
    throw new GetDataException(`Failed to fetch data: ${error.message}`);
  }
};

// Function to process the data
const processData = (data: Post) => {
  try {
    return {
      ...data,
      title: data.title.toUpperCase(), // Example transformation
    };
  } catch (error) {
    throw new ProcessDataException(`Failed to process data: ${error.message}`);
  }
};

export const fetchData = async (url: string) => {
  try {
    const data = await getData(url);
    const processedData = processData(data);

    // UI Updates
    console.log('Title:', processedData.title);
    console.log('Body:', processedData.body);

    // Caching
    localStorage.setItem('post', JSON.stringify(processedData));

    // Logging
    console.log('Fetched data:', processedData);
  } catch (error) {
    if (error instanceof GetDataException) {
      console.error('GetDataException:', error.message);
      alert(`Error fetching data: ${error.message}`);
    } else if (error instanceof ProcessDataException) {
      console.error('ProcessDataException:', error.message);
      alert(`Error processing data: ${error.message}`);
    } else {
      // Handle unexpected errors
      console.error('Unexpected Error:', error);
      alert('An unexpected error occurred.');
    }

    // Retry Logic (simple example)
    setTimeout(() => fetchData(url), 3000);
  }
};
