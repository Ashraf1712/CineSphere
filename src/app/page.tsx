"use client";

import MovieContent from "@/Components/MovieList/MovieContent";
import { useState } from "react";


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
      <h1>Nav</h1>

      {/* SIDEBAR */}
      <div className="flex flex-col">
        {/* Main content */}
        <div className="bg-green-500 mb-4">
          <MovieContent fetchID={1}/>
        </div>
        {/* Filter */}

      </div>
    </div>
  );


  
  
  
  
  
}
