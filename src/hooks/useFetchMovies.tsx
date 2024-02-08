"use client "
import { fetchPopularMovies } from "@/Service/tmdbService";
import { useEffect, useState } from "react";

import React from 'react'

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

export default function useFetchMovies(endpoint: string, page: number) {
    const [data, setData] = useState<Movie[]>([]);
    const [temporaryData, setTemporaryData] = useState<Movie[]>([]);

    useEffect(() => {
        let isMounted = true;

        const fetchMovies = async() => {
            try {
                const moviesPage1 = await fetchPopularMovies("/movie/popular", page);
                const moviesPage2 = await fetchPopularMovies("/movie/popular", page + 1);
                const combinedResults = [...moviesPage1.results, ...moviesPage2.results];
                
                if (temporaryData.length > 0) {
                  const currentPageResults = combinedResults.slice(10,40);
                  setData(currentPageResults);
                  setTemporaryData([]);
                }else{
                  const currentPageResults = combinedResults.slice(0, 30);
                  const temporaryResults = combinedResults.slice(currentPageResults.length,combinedResults.length);
                  setData(currentPageResults);
                  setTemporaryData(temporaryResults);
                }
              } catch (error) {
                console.error("Error fetching movies:", error);
              }
        }

        if (endpoint && page) {
            fetchMovies();
          }
      
          return () => {
            isMounted = false;
          };
    },[endpoint,page,data,temporaryData])

    return data;
}

