"use client";

import { fetchPopularMovies } from "@/Service/tmdbService";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [temporaryData, setTemporaryData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesPage1 = await fetchPopularMovies("/movie/popular", pageNumber);
        const moviesPage2 = await fetchPopularMovies("/movie/popular", pageNumber + 1);
        const combinedResults = [...moviesPage1.results, ...moviesPage2.results];

        if (temporaryData.length > 0) {
          const currentPageResults = combinedResults.slice(10,40);
          setPopularMovies(currentPageResults);
          setTemporaryData([]);
        }else{
          const currentPageResults = combinedResults.slice(0, 30);
          const temporaryResults = combinedResults.slice(currentPageResults.length,combinedResults.length);
          setPopularMovies(currentPageResults);
          setTemporaryData(temporaryResults);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    fetchMovies();
  }, [pageNumber]);
  
  const loadMoreMovies = async () => {
    setPageNumber(pageNumber + 1); // Increment pageNumber to load the next page
  
  };
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Popular Movies</h1>
      <ol>
        {popularMovies &&
          popularMovies.map((movie: any, index: number) => (
            <li key={index}>{index + 1}. {movie.title}</li>
          ))}
      </ol>
      <button onClick={loadMoreMovies} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Next
      </button>
    </div>
  );
  
  
}
