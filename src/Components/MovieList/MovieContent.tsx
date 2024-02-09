"use client"
import { useEffect, useState } from "react";
import { fetchMovieByGenre, fetchPopularMovies,fetchMovieByRatings,fetchMovieByGenreAndRatings } from "@/Service/tmdbService";
import React, { useContext } from 'react'
import { Movie } from "@/app/types/Movie";
import { MovieCard } from "../MovieCard/MovieCard";
import { genres } from "@/utils/constant";
interface MovieContentProps {
  fetchID: number;
  genre: any[];
  rating: any;
}

const MovieContent: React.FC<MovieContentProps> = ({ fetchID, genre, rating }) => {
  const [data, setData] = useState<Movie[]>([]);
  const [temporaryData, setTemporaryData] = useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    let isMounted = true;
    let moviesPage1: Movie[] = []
    let moviesPage2: Movie[] = []

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
        
        const combinedResults = [...moviesPage1, ...moviesPage2];

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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
};

const handleCheckboxChange = (genreId: number[]) => {
  setSelectedGenres(prevSelectedGenres => {
      if (prevSelectedGenres.includes(genreId)) {
          return prevSelectedGenres.filter(id => id !== genreId);
      } else {
          return [...prevSelectedGenres, genreId];
      }
  });

  console.log(selectedGenres);
};


  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  // const handleSortByTitle = () => {
  //   const sortedData = [...data].sort((a, b) => a.title.localeCompare(b.title));
  //   setData(sortedData);
  // };

  return (
    <div>
            <div className="relative">
          <div className="bg-blue-500 p-2" onClick={toggleDropdown}>
              Filter
          </div>
          {dropdownVisible && (
              <div className="absolute top-full left-0 bg-white border border-gray-300 p-4 shadow-md text-gray-700">
                  {genres.map(genre => (
                      <label key={genre.id} className="block">
                          <input
                              type="checkbox"
                              value={genre.id}
                              checked={selectedGenres.includes(genre.id)}
                              onChange={() => handleCheckboxChange(genre.id)}
                          />
                          {genre.genre}
                      </label>
                  ))}
              </div>
          )}
      </div>

      <h1 className="text-xl font-bold mb-4">Popular Movies</h1>
      {/* <button onClick={handleSortByTitle} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sort by Movie Title</button> */}
      <div className="flex flex-wrap justify-center gap-4">
  {data &&
    data.map((movie: any, index: number) => (
        <MovieCard
        key={index}
          id={movie.id}
          image={movie.poster_path}
          title={movie.title}
          date={movie.release_date}
          rating={movie.vote_average}
          description=""
        />
    ))}
</div>

      <button onClick={handlePreviousPage} disabled={pageNumber === 1} className={`mr-2 ${pageNumber === 1 ? "" : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}`}>Previous</button>
      <button onClick={handleNextPage} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Next
      </button>
    </div>
  );
}

export default MovieContent;
