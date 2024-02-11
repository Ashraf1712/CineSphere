const fetchMovieByGenreAndRatings = async (genreId: number[], page: number, minRating: number, maxRating: number, sort: string) => {
  try {
    let apiUrl = `${process.env.API_URL}/discover/movie?api_key=${process.env.DATA_API_KEY}&page=${page}&include_adult=false&include_video=false`;

    if (genreId.length > 0) {
      apiUrl += `&with_genres=${genreId.join(',')}`;
    }

    if (minRating > 0) {
      apiUrl += `&vote_average.gte=${minRating}`;
    }

    if (maxRating <= 10) {
      apiUrl += `&vote_average.lte=${maxRating}`;
    }

    if (sort) {
      apiUrl += `&sort_by=${sort}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
    return data.results;

  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error; // re-throw the error to be handled by the caller
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

export { fetchMovieByGenreAndRatings, fetchMovieCastByMovieId };