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

// Function to get data from the API
const getData = async (url: string): Promise<Post> => {
  const response = await axios.get<Post>(url);
  return response.data;
};

// Function to process the data
const processData = (data: Post) => {
  return {
    ...data,
    title: data.title.toUpperCase(), // Example transformation
  };
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
    // Error Handling
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error(
          'Server Error:',
          error.response.status,
          error.response.data
        );
        alert(`Server Error: ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network Error:', error.message);
        alert('Network Error: Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      }
    } else if (error instanceof TypeError) {
      // Handle TypeError
      console.error('Type Error:', error.message);
      alert('A type error occurred. Please check your code.');
    } else if (error instanceof ReferenceError) {
      // Handle ReferenceError
      console.error('Reference Error:', error.message);
      alert('A reference error occurred. Please check your code.');
    } else {
      // Non-Axios and non-specific error
      console.error('Unexpected Error:', error);
      alert('An unexpected error occurred.');
    }

    // Retry Logic (simple example)
    setTimeout(() => fetchData(url), 3000);
  }
};
