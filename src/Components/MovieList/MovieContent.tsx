"use client"
import { useEffect, useState } from "react";
import { fetchMovieByGenreAndRatings } from "@/Service/tmdbService";
import React, { useRef } from 'react'
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
  const [pageNumber, setPageNumber] = useState(1);
  let count = useRef(0);

  useEffect(() => {
    let isMounted = true;
    const fetchMovies = async () => {
      try {
        let moviesPage1: Movie[] = [];
        let moviesPage2: Movie[] = [];
        let page1Number = 0;
        let page2Number = 0;

        if (pageNumber === 1) {
          page1Number = 1;
          page2Number = 2;
          count.current = 0;
        } else {
          page1Number = pageNumber + Math.floor(count.current + 1 / 2);
          page2Number = page1Number + 1;
          //If the page number is even, it should update for next page usage
          if (pageNumber % 2 === 0) {
            count.current++;
          }
        }

        moviesPage1 = await fetchMovieByGenreAndRatings(genreId, page1Number, minRating, maxRating, sortResult);
        moviesPage2 = await fetchMovieByGenreAndRatings(genreId, page2Number, minRating, maxRating, sortResult);

        const combinedResults = [...moviesPage1, ...moviesPage2];

        //Every even page number, it always fetch Array(10,40) since first 10 of the array already displayed on the previous page
        if (pageNumber % 2 === 0) {
          const currentPageResults = combinedResults.slice(10, 40);
          setData(currentPageResults);
        } else {
          const currentPageResults = combinedResults.slice(0, 30);
          setData(currentPageResults);
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
      count.current--;
      setPageNumber(pageNumber - 1);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <button onClick={handlePreviousPage} disabled={pageNumber === 1} className={`mr-2 ${pageNumber === 1 ? "" : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}`}>Previous</button>
      <button onClick={handleNextPage} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Next
      </button>
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
            genreId={movie.genre_ids}
          />
        ))}
      </div>


    </div>
  );
}

export default MovieContent;
