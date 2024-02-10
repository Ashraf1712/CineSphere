import React from 'react';

interface SortOption {
    value: string;
    label: string;
}

interface SortResultProps {
    selectedOption: string;
    onSortChange: (selectedOption: string) => void;
}

const SortResult: React.FC<SortResultProps> = ({ selectedOption, onSortChange }) => {
    const sortOptions: SortOption[] = [
        { value: 'popularity.desc', label: 'Popularity Descending' },
        { value: 'popularity.asc', label: 'Popularity Ascending' },
        { value: 'release_date.desc', label: 'Release Date Descending' },
        { value: 'release_date.asc', label: 'Release Date Ascending' },
        { value: 'vote_average.desc', label: 'Ratings Descending' },
        { value: 'vote_average.asc', label: 'Ratings Ascending' },
        { value: 'original_title.asc', label: 'Title (A-Z)' },
        { value: 'original_title.desc', label: 'Title (Z-A)' }
    ];

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        onSortChange(selectedOption);
    };

    return (
        <select className="bg-gray-500" id="sort_by" value={selectedOption} onChange={handleSortChange}>
            {sortOptions.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
};

export default SortResult;
