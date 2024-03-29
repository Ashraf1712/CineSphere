"use client"

import React, { useEffect, useState } from 'react';
import { genres as allGenres } from '@/types/Movie';
import { Button } from '@chakra-ui/react';
import AnimatedHamburgerButton from '@/Components/Button/AnimatedHamburgerButton';
import FilterGenre from '@/Components/Filter/FilterGenre';
import FilterRating from '@/Components/Filter/FilterRating';
import SortResult from '@/Components/Sort/SortResult';
import MovieContent from '@/Components/MovieList/MovieContent';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { Kanit } from 'next/font/google';

const kanit = Kanit({
  weight: '900',
  subsets: ['latin'],
  variable: '--font-kanit',
  style: 'italic'
})

const Home: React.FC = () => {

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

  // FULLY FUNCTIONAL DECENT ON MOBILE AND TABLE SCREEN SIZES (IN PROGRESS)
  const [selectedSortOption, setSelectedSortOption] = useState<string>('popularity.desc');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxRating, setMaxRating] = useState<number>(10);
  const [dummyState, setDummyState] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const [tempState, setTempState] = useState<{
    selectedSortOption: string;
    selectedGenres: number[];
    minRating: number;
    maxRating: number;
  } | null>(null);

  useEffect(() => {
    if (navOpen) {
      setTempState({
        selectedSortOption,
        selectedGenres,
        minRating,
        maxRating
      });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    const handleClickOutside = (event: MouseEvent) => {
      const filterGenreElement = document.getElementById('filter-genre');
      if (
        dropdownVisible &&
        filterGenreElement &&
        !filterGenreElement.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navOpen, dropdownVisible]);

  const handleRatingChange = (newMinRating: number, newMaxRating: number) => {
    setMinRating(newMinRating);
    setMaxRating(newMaxRating);
  };

  const handleSortChange = (selectedOption: string) => {
    setSelectedSortOption(selectedOption);
  };

  const handleCheckboxChange = (genreId: number) => {
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
    setIsFiltering(true);
    setTempState(null);
    setDummyState(prevState => !prevState);
    toggleNav();
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
    if (!navOpen) {
      setDropdownVisible(false);
    }
  }

  const handleBackgroundClick = () => {
    if (navOpen) {
      setNavOpen(false);
      if (tempState) {
        setSelectedSortOption(tempState.selectedSortOption);
        setSelectedGenres(tempState.selectedGenres);
        setMinRating(tempState.minRating);
        setMaxRating(tempState.maxRating);
      }
    }

  };

  const scrollMode = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilteringChange = (value: boolean) => {
    setIsFiltering(value);
  };




  return (
    <>
      <div className={`fixed ${navOpen ? 'backdrop-blur-md inset-0' : 'relative'} bg-black bg-opacity-50 z-30 overflow-hidden`} onClick={handleBackgroundClick}>
        <div className={`fixed w-full ${navOpen ? 'inset-0' : ''}`} >
          <nav id="nav-bar" className="flex items-center p-4 bg-neutral-900 text-white" >

            <div className='z-20'>
              <AnimatedHamburgerButton onClick={toggleNav} isOpen={navOpen} />
            </div>


            <div className='pl-5'>
              <p className={kanit.className}>CineSphere</p>
            </div>
            <div className={`absolute top-0 left-0 h-full w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 bg-gray-600 z-999  duration-300 ${navOpen ? 'opacity-100' : ' opacity-0 -translate-x-full '}`} onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col h-full pt-14 "  >
                <div className="flex-grow h-full bg-gray-600 ">
                  <div className="flex-row">
                    <p className=" px-5 p-3 font-bold text-4xl">Filters</p>
                  </div>
                  <div className="flex-row p-5">
                    <SortResult labelText={"Sort By"} selectedOption={selectedSortOption} onSortChange={handleSortChange} />
                  </div>

                  <div id={"filter-genre"} className="flex-row p-5 ">
                    <FilterGenre
                      labelText={"Genre"}
                      genres={allGenres}
                      selectedGenres={selectedGenres}
                      handleCheckboxChange={handleCheckboxChange}
                      dropdownVisible={dropdownVisible}
                      toggleDropdown={toggleDropdown}
                    />
                  </div>
                  <div className="flex-row p-5" onClick={(e) => e.stopPropagation()}>
                    <FilterRating labelText={"Ratings"} min={0} max={10} minRating={minRating} maxRating={maxRating} handleRatingChange={handleRatingChange} />
                  </div>
                </div>
                <div className="flex-row p-5 justify-end">
                  <Button className="w-full rounded-3xl" colorScheme='red' onClick={handleSearch}>Search</Button>
                </div>
              </div>
            </div>

          </nav>
        </div>
      </div>
      <div className="cursor-pointer fixed bottom-0 right-0 p-5 align-bottom z-10 text-3xl dark:text-white lg:text-5xl md:text-4xl">
        <BsFillArrowUpCircleFill onClick={scrollMode} />
      </div>
      <div className="bg-neutral-900 mb-4 z-10">
        <MovieContent setFiltering={handleFilteringChange} isFiltering={isFiltering} sortResult={selectedSortOption} minRating={minRating} maxRating={maxRating} genreId={selectedGenres} dummyState={dummyState} />
      </div>
    </>
  );
};

export default Home;
