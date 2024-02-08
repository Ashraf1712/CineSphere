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
        let nextPageNumber = pageNumber;
        
        if (temporaryData.length > 0) {
          // Calculate the number of results from temporary data already shown on current page
          const temporaryDataShownOnCurrentPage = temporaryData.findIndex(movie => movie === temporaryData[0]);
          const temporaryDataRemainingOnCurrentPage = temporaryData.length - temporaryDataShownOnCurrentPage;
  
          // If remaining temporary data exceeds the number of results needed on current page
          if (temporaryDataRemainingOnCurrentPage >= 30) {
            // No need to fetch additional pages
            const currentPageResults = temporaryData.slice(temporaryDataShownOnCurrentPage + 1, temporaryDataShownOnCurrentPage + 31);
            setPopularMovies(currentPageResults);
            return;
          } else {
            // Adjust nextPageNumber to fetch subsequent pages
            nextPageNumber++;
          }
        }
  
        // Fetch the first page
        const moviesPage1 = await fetchPopularMovies("/movie/popular", nextPageNumber);
        console.log("Movies - Page 1:", moviesPage1);
  
        // Fetch the second page
        const moviesPage2 = await fetchPopularMovies("/movie/popular", nextPageNumber + 1);
        console.log("Movies - Page 2:", moviesPage2);
  
        // Combine the results from both pages
        const combinedResults = [...moviesPage1.results, ...moviesPage2.results];
  
        // Find the index where the temporary data ends
        const temporaryDataEndIndex = combinedResults.findIndex(movie => movie === temporaryData[0]);
  
        // Extract the results starting after the temporary data
        const currentPageResults = combinedResults.slice(temporaryDataEndIndex + 1, temporaryDataEndIndex + 31);
  
        // Set the popular movies state with the current page results
        setPopularMovies(currentPageResults);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    fetchMovies();
  }, [pageNumber, temporaryData]);
  
    
  
  
  



  const loadMoreMovies = async () => {
    setPageNumber(pageNumber + 1); // Increment pageNumber to load the next page
  
  };
  
  
  console.log("Popular movies:", popularMovies);



  return (
    <div>
      <h1>Popular Movies</h1>
      <ol type="1">
        {/* @ts-ignore */}
        {popularMovies &&
          popularMovies.map((movie: any,index: number) => (
            <li key={index}>{movie.title}</li>
          ))}
      </ol>
      <button onClick={loadMoreMovies}>Next</button>
    </div>
  );
}
