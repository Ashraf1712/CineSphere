"use client";

import FilterGenre from "@/Components/Filter/FilterGenre";
import FilterRating from "@/Components/Filter/FilterRating";
import MovieContent from "@/Components/MovieList/MovieContent";
import SortResult from "@/Components/Sort/SortResult";
import { useState } from "react";
import { Genre, genres as allGenres } from "../types/Movie";


export default function Home() {
  //TODO (DONE) : FILTER BUTTON FOR GENRE AND RATINGS
  //        => CHECK IF GENRE IS NOT NULL , FETCH BY GENRE 
  //        => CHECK IF RATING IS NOT NULL , FETCH BY RATING
  //        => CHECK IF GENRE AND RATING IS NOT NULL, FETCH BY GENRE AND RATING
  //TODO (DONE) : SORT LIST BY 
  //       a. MOVIE TITLE (SORT BY ASCENDING)
  //       b. RELEASE DATE (SORT BY ASCENDING)
  //       c. POPULARITY (SORT BY ASCENDING)
  //       d. RATINGS (SORT BY ASCENDING)

  //TODO (DONE) : DESIGN MODAL WINDOW SHOW
  //       a. MOVIE
  //       b. SYNOPSIS
  //       c. RELEASE DATE
  //       d. CAST

  // FULLY FUNCTIONAL DECENT ON MOBILE AND TABLE SCREEN SIZES

  const [selectedSortOption, setSelectedSortOption] = useState<string>('popularity.desc');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxRating, setMaxRating] = useState<number>(10);
  const [dummyState, setDummyState] = useState(false);

  const handleRatingChange = (newMinRating: number, newMaxRating: number) => {
    setMinRating(newMinRating);
    setMaxRating(newMaxRating);
  };

  const handleSortChange = (selectedOption: string) => {
    setSelectedSortOption(selectedOption);
  };

  const handleCheckboxChange = async (genreId: number) => {
    setSelectedGenres(prevSelectedGenres => {
      if (prevSelectedGenres.includes(genreId)) {
        return prevSelectedGenres.filter(id => id !== genreId);
      } else {
        return [...prevSelectedGenres, genreId];
      }
    });
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSearch = async () => {
    setDummyState(prevState => !prevState);
  };


  return (
    <div>
      <SortResult selectedOption={selectedSortOption} onSortChange={handleSortChange} />
      <FilterGenre
        genres={allGenres}
        selectedGenres={selectedGenres}
        handleCheckboxChange={handleCheckboxChange}
        dropdownVisible={dropdownVisible}
        toggleDropdown={toggleDropdown}
      />
      <div className="w-64 bg-white h-full">
        <FilterRating min={1} max={10} minRating={minRating} maxRating={maxRating} handleRatingChange={handleRatingChange} />
      </div>

      <div className="flex flex-col">
        <div className="bg-green-500 mb-4">
          <button onClick={handleSearch}>Search</button>
          <MovieContent sortResult={selectedSortOption} minRating={minRating} maxRating={maxRating} genreId={selectedGenres} dummyState={dummyState} />
        </div>
      </div>
    </div>
  );
}
