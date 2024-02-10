import React from 'react';
import { Genre } from '@/types/Movie';

interface FilterGenreProps {
    genres: Genre[];
    selectedGenres: number[]; // Change the type to number[]
    handleCheckboxChange: (genreId: number) => void;
    dropdownVisible: boolean;
    toggleDropdown: () => void;
}

const FilterGenre: React.FC<FilterGenreProps> = ({
    genres,
    selectedGenres,
    handleCheckboxChange,
    dropdownVisible,
    toggleDropdown
}) => {
    return (
        <div className="relative">
            <div className="bg-cyan-700 p-2" onClick={toggleDropdown}>
                Genre
            </div>
            {dropdownVisible && (
                <div className="absolute top-full left-0 bg-white border border-gray-300 p-4 shadow-md text-gray-700">
                    {genres.map(genre => (
                        <label key={genre.id} className="block">
                            <input
                                type="checkbox"
                                value={genre.id}
                                checked={selectedGenres.includes(genre.id)}
                                onChange={() => handleCheckboxChange(genre.id)}
                            />
                            {genre.genre}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterGenre;
