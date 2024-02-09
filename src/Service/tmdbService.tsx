
const fetchPopularMovies = async ( page: number) => {
  try {
    const response = await fetch(`${process.env.API_URL}/movie/popular?api_key=${process.env.DATA_API_KEY}&page=${page}`)
    const data = await response.json();
    console.log(data.results);
    return data.results;

  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

const fetchMovieByGenre = async (genreId: number[], page: number) => {
  try{
    const response = await fetch(`${process.env.API_URL}/discover/movie?api_key=${process.env.DATA_API_KEY}&page=${page}&with_genres=${genreId.join(',')}`)
    const data = await response.json();
    return data.results;

  }catch(error){
    console.error('Error fetching popular movies:', error)
  }
}

const fetchMovieByGenreAndRatings = async (genreId: number[], page: number, rating:number) => {
  try{
    const response = await fetch(`${process.env.API_URL}/discover/movie?api_key=${process.env.DATA_API_KEY}&page=${page}&with_genres=${genreId.join(',')}&vote_average.gte=${rating}`)
    const data = await response.json();
    return data.results;

  }catch(error){
    console.error('Error fetching popular movies:', error)
  }
}

const fetchMovieByRatings = async (page: number, rating:number) => {
  try{
    const response = await fetch(`${process.env.API_URL}/discover/movie?api_key=${process.env.DATA_API_KEY}&page=${page}&vote_average.gte=${rating}`)
    const data = await response.json();
    return data.results;

  }catch(error){
    console.error('Error fetching popular movies:', error)
  }
}

const fetchMovieCastByMovieId = async (movieID: number) => {
  try{
    const response = await fetch(`${process.env.API_URL}/movie/${movieID}/credits?api_key=${process.env.DATA_API_KEY}`)
    const data = await response.json();
    console.log(data)
    return data.cast

  }catch(error){
    console.error('Error fetching popular movies:', error)
  }
}

export {fetchMovieByGenre,fetchPopularMovies, fetchMovieByRatings,fetchMovieByGenreAndRatings,fetchMovieCastByMovieId};