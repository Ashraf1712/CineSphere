import axios from 'axios';

const fetchPopularMovies = async (endPoint: string, page: number) => {
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

const fetchMovieByGenre = async (genreId: number[], page: number) => {
  try{
    const response = await fetch(`${process.env.API_URL}/discover/movie?api_key=${process.env.DATA_API_KEY}&page=${page}&with_genres=${genreId.join(',')}`)
    const data = await response.json();
    console.log(data);
    return data;
  }catch(error){
    console.error('Error fetching popular movies:', error)
  }
}

const fetchMovieByGenreAndRatings = async (genreId: number[], page: number, rating:number) => {
  try{
    const response = await fetch(`${process.env.API_URL}/discover/movie?api_key=${process.env.DATA_API_KEY}&page=${page}&with_genres=${genreId.join(',')}&vote_average.gte=${rating}`)
    const data = await response.json();
    console.log(data);
    return data;
  }catch(error){
    console.error('Error fetching popular movies:', error)
  }
}

const fetchMovieByRatings = async (page: number, rating:number) => {
  try{
    const response = await fetch(`${process.env.API_URL}/discover/movie?api_key=${process.env.DATA_API_KEY}&page=${page}&vote_average.gte=${rating}`)
    const data = await response.json();
    console.log(data);
    return data;
  }catch(error){
    console.error('Error fetching popular movies:', error)
  }
}

export {fetchMovieByGenre,fetchPopularMovies, fetchMovieByRatings,fetchMovieByGenreAndRatings};