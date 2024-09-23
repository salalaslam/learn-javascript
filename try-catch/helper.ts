import { ProcessDataException } from './exceptions';
import { Post } from './types';

// Function to process the data
export const processData = (data: Post) => {
  try {
    return {
      ...data,
      title: data.title.toUpperCase(), // Example transformation
    };
  } catch (error) {
    throw new ProcessDataException(`Failed to process data: ${error.message}`);
  }
};
