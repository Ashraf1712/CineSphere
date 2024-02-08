import axios from 'axios';

export const fetchPopularMovies = async (endPoint: string, page: number) => {
  try {
    const response = await fetch(`${process.env.API_URL}${endPoint}?api_key=${process.env.DATA_API_KEY}&page=${page}`)
    // const response = await fetch(`${process.env.API_URL}/movie/popular?api_key=${process.env.DATA_API_KEY}`)
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};
