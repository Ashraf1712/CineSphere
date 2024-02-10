"use client"
import { useEffect, useState } from "react";
import { fetchMovieByGenreAndRatings } from "@/Service/tmdbService";
import React, { useContext } from 'react'
import { Movie, } from "@/types/Movie";
import { MovieCard } from "../MovieCard/MovieCard";


interface MovieContentProps {
  sortResult: string;
  minRating: number;
  maxRating: number;
  genreId: number[];
  dummyState: boolean;
}

const MovieContent: React.FC<MovieContentProps> = ({ sortResult, minRating, maxRating, genreId, dummyState }) => {
  const [data, setData] = useState<Movie[]>([]);
  const [temporaryData, setTemporaryData] = useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = useState(1);


  useEffect(() => {
    let isMounted = true;
    const fetchMovies = async () => {
      try {
        let moviesPage1: Movie[] = [];
        let moviesPage2: Movie[] = [];
        console.log(sortResult);

        moviesPage1 = await fetchMovieByGenreAndRatings(genreId, pageNumber, minRating, maxRating, sortResult);
        moviesPage2 = await fetchMovieByGenreAndRatings(genreId, pageNumber + 1, minRating, maxRating, sortResult);

        const combinedResults = [...moviesPage1, ...moviesPage2];
        console.log(combinedResults);
        //Output: [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 8, 9, 10, 11, 11, 12] Make this pattern for page

        if (temporaryData.length > 0) {
          const currentPageResults = [...temporaryData, ...moviesPage2];
          console.log("Temporary Current", currentPageResults)
          setData(currentPageResults);
          setTemporaryData([]);
        } else {
          const currentPageResults = combinedResults.slice(0, 30);
          const temporaryResults = combinedResults.slice(30);
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
  }, [pageNumber, dummyState]);



  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>

      <div className="flex ">
      </div>

      <h1 className="text-xl font-bold mb-4">Popular Movies</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {data.map((movie, index) => (
          <MovieCard
            key={index}
            id={movie.id}
            image={movie.poster_path}
            title={movie.title}
            date={movie.release_date}
            rating={movie.vote_average}
            description={movie.overview}
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
