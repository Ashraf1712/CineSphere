import { useState } from 'react';

export const genres = [
    { id: 28, genre: "Action" },
    { id: 12, genre: "Adventure" },
    { id: 16, genre: "Animation" },
    { id: 35, genre: "Comedy" },
    { id: 80, genre: "Crime" },
    { id: 99, genre: "Documentary" },
    { id: 18, genre: "Drama" },
    { id: 10751, genre: "Family" },
    { id: 14, genre: "Fantasy" },
    { id: 36, genre: "History" },
    { id: 27, genre: "Horror" },
    { id: 10402, genre: "Music" },
    { id: 9648, genre: "Mystery" },
    { id: 10749, genre: "Romance" },
    { id: 878, genre: "Science Fiction" },
    { id: 53, genre: "Thriller" },
    { id: 10770, genre: "TV Movie" },
    { id: 10752, genre: "War" },
    { id: 37, genre: "Western" }
];

const Filter = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleCheckboxChange = (genreId) => {
        if (selectedGenres.includes(genreId)) {
            setSelectedGenres(selectedGenres.filter(id => id !== genreId));
        } else {
            setSelectedGenres([...selectedGenres, genreId]);
        }
    };

    return (
        <div className="relative">
            <div className="bg-blue-500 p-2" onClick={toggleDropdown}>
                Filter
            </div>
            {dropdownVisible && (
                <div className="absolute top-full left-0 bg-white border border-gray-300 p-4 shadow-md">
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

export default Filter;
