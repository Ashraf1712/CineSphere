"use client"
import { useEffect, useState } from "react";
import { fetchMovieByGenre, fetchPopularMovies,fetchMovieByRatings,fetchMovieByGenreAndRatings } from "@/Service/tmdbService";

interface MovieContentProps {
  fetchID: number;
  genre: any[];
  rating: any;
}

interface MoviePage {
  results: Movie[];
}

interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MovieContent: React.FC<MovieContentProps> = ({ fetchID, genre, rating }) => {
  const [data, setData] = useState<Movie[]>([]);
  const [temporaryData, setTemporaryData] = useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {

  
    let isMounted = true;
    let moviesPage1: MoviePage = { results: [] };
    let moviesPage2: MoviePage = { results: [] };

    const fetchMovies = async () => {
      try {
        switch(fetchID){
          case 1://Fetch Popular Movies
            moviesPage1 = await fetchPopularMovies(pageNumber);
            moviesPage2 = await fetchPopularMovies(pageNumber + 1);
            break;
          
          case 2://Fetch Movie By Genre
            moviesPage1 = await fetchMovieByGenre(genre,pageNumber);
            moviesPage2 = await fetchMovieByGenre(genre,pageNumber + 1);
            break;

          case 3://Fetch Movie By Ratings
            moviesPage1 = await fetchMovieByRatings(pageNumber,rating);
            moviesPage2 = await fetchMovieByRatings(pageNumber + 1,rating);
            break;

          case 4://Fetch Movie By Genre and Ratings
            moviesPage1 = await fetchMovieByGenreAndRatings(genre,pageNumber,rating);
            moviesPage2 = await fetchMovieByGenreAndRatings(genre,pageNumber + 1,rating);
            break;

            default:
              return;
        }
        
        const combinedResults = [...moviesPage1.results, ...moviesPage2.results];

        if (temporaryData.length > 0) {
          const currentPageResults = combinedResults.slice(10, 40);
          setData(currentPageResults);
          setTemporaryData([]);
        } else {
          const currentPageResults = combinedResults.slice(0, 30);
          const temporaryResults = combinedResults.slice(currentPageResults.length, combinedResults.length);
          setData(currentPageResults);
          setTemporaryData(temporaryResults);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [pageNumber, genre, rating]);

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleSortByTitle = () => {
    const sortedData = [...data].sort((a, b) => a.title.localeCompare(b.title));
    setData(sortedData);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Popular Movies</h1>
      <button onClick={handleSortByTitle} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sort by Movie Title</button>

      <ol>
        {data &&
          data.map((movie: any, index: number) => (
            <li key={index}>{index + 1}. {movie.title}</li>
          ))}
      </ol>
      <button onClick={handlePreviousPage} disabled={pageNumber === 1} className={`mr-2 ${pageNumber === 1 ? "" : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}`}>Previous</button>
      <button onClick={handleNextPage} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Next
      </button>
    </div>
  );
}

export default MovieContent;
