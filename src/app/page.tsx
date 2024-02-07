"use client"

import { fetchPopularMovies } from "@/Service/tmdbService";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await fetchPopularMovies();
        console.log("Movies:", movies); // Log the fetched movies
        setPopularMovies(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        // Handle error
      }
    };

    fetchMovies();
  }, []);

  console.log("Popular movies:", popularMovies); // Log the popular movies state

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
   {/* @ts-ignore */}

      {popularMovies.results && popularMovies.results.map((movie: any) => (
  <li key={movie.id}>{movie.title}</li>
))}

      {/* {popularMovies && popularMovies.map((movie: any) => (
  <li key={movie.id}>{movie.title}</li>
))} */}

      </ul>
    </div>
  );
}
