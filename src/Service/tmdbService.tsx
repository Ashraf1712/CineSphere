
const fetchPopularMovies = async (page: number, sort: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/discover/movie?api_key=${process.env.DATA_API_KEY}&sort_by${sort}&page=${page}`)
    const data = await response.json();
    console.log(data.results);
    return data.results;

  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

const fetchMovieByGenreAndRatings = async (genreId: number[], page: number, minRating: number, maxRating: number, sort: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/discover/movie?api_key=${process.env.DATA_API_KEY}&page=${page}&with_genres=${genreId.join(',')}&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&sort_by=${sort}`)
    const data = await response.json();
    return data.results;

  } catch (error) {
    console.error('Error fetching popular movies:', error)
  }
}

const fetchMovieCastByMovieId = async (movieID: number) => {
  try {
    const response = await fetch(`${process.env.API_URL}/movie/${movieID}/credits?api_key=${process.env.DATA_API_KEY}`)
    const data = await response.json();
    console.log(data)
    return data.cast

  } catch (error) {
    console.error('Error fetching popular movies:', error)
  }
}

export { fetchPopularMovies, fetchMovieByGenreAndRatings, fetchMovieCastByMovieId };