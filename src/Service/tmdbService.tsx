import axios from 'axios';

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=87dd60c03288f33cb2cae17ecefc50c1`)
    const data = await response.json();

    console.log(data);
    return data;
    
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};
