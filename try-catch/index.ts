import { getData } from './api';
import { GetDataException, ProcessDataException } from './exceptions';
import { processData } from './helper';

// Sample API endpoint
const url = 'https://jsonplaceholder.typicode.com/posts/1';

const init = async () => {
  try {
    const data = await getData(url);
    const processedData = processData(data);

    // Logging
    console.log('Fetched data:', processedData);
  } catch (error) {
    if (error instanceof GetDataException) {
      console.error('GetDataException:', error.message);
    } else if (error instanceof ProcessDataException) {
      console.error('ProcessDataException:', error.message);
    } else {
      // Handle unexpected errors
      console.error('Unexpected Error:', error);
    }
  }
};

init();
