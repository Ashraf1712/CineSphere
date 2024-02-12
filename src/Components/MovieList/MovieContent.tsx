"use client"
import { useEffect, useState } from "react";
import { fetchMovieByGenreAndRatings } from "@/Service/tmdbService";
import React, { useRef } from 'react'
import { Movie, } from "@/types/Movie";
import { MovieCard } from "../MovieCard/MovieCard";
import PaginationButton from "../Button/PaginationButton";

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
  const [isFiltering, setIsFiltering] = useState(false);
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

  useEffect(() => {
    if (isFiltering) {
      setPageNumber(1);
      count.current = 0;
      setIsFiltering(false);
    }
  }, [genreId, minRating, maxRating, sortResult, isFiltering]);

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
      <div className="pt-16">
        <div className="mx-auto bg-neutral-800  ml-16 mr-16 shadow-lg rounded-sm">
          <p className="p-4 text-2xl font-bold text-white">Popular Movies</p>
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-5 px-16 py-16 mx-auto lg:px-2 sm:px-4">
        {data.map((movie, index) => (
          <div key={index} className="w-full sm:w-2/3 md:w-1/4 lg:w-1/5 xl:w-1/6 ">
            <div className="relative">
              <MovieCard
                id={movie.id}
                image={movie.poster_path}
                title={movie.title}
                date={movie.release_date}
                rating={movie.vote_average}
                description={movie.overview}
                genreId={movie.genre_ids}
              />
            </div>
          </div>
        ))}
      </div>


      <PaginationButton onClickNext={handleNextPage} onClickPrev={handlePreviousPage} />


    </div>
  );
}

export default MovieContent;
