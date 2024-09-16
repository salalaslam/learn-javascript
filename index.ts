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

export const fetchData = async (url: string) => {
  try {
    const response = await axios.get<Post>(url);
    // Process the data
    const data = response.data;

    // Data Processing
    const processedData = {
      ...data,
      title: data.title.toUpperCase(), // Example transformation
    };

    // UI Updates
    console.log('Title:', processedData.title);
    console.log('Body:', processedData.body);

    // Caching
    localStorage.setItem('post', JSON.stringify(processedData));

    // Logging
    console.log('Fetched data:', processedData);
  } catch (error) {
    // Error Handling
    console.error('Error fetching data:', error);

    // Retry Logic (simple example)
    setTimeout(() => fetchData(url), 3000);
  }
};
