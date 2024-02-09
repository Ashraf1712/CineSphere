"use client";

import MovieContent from "@/Components/MovieContent";


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


export default function Home() {
  //TODO : FILTER BUTTON FOR GENRE AND RATINGS
  //TODO : SORT LIST BY 
  //       a. MOVIE TITLE
  //       b. RELEASE DATE
  //       c. POPULARITY
  //       d. RATINGS

  //TODO : DESIGN MODAL WINDOW SHOW
  //       a. MOVIE
  //       b. SYNOPSIS
  //       c. RELEASE DATE
  //       d. CAST

  // FULLY FUNCTIONAL DECENT ON MOBILE AND TABLE SCREEN SIZES


  return (
    <div>
        <MovieContent fetchID={1}/>
    </div>
  );
  
  
}
