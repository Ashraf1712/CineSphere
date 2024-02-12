import { Select } from '@chakra-ui/react';
import React from 'react';


interface SortOption {
    value: string;
    label: string;
}

interface SortResultProps {
    selectedOption: string;
    onSortChange: (selectedOption: string) => void;
    labelText: string;
}

const SortResult: React.FC<SortResultProps> = ({ selectedOption, onSortChange, labelText }) => {
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
        <>
            <div className='pb-2 font-semibold'>
                {labelText}
            </div>
            <Select _hover={{ bg: 'gray.200' }} cursor="pointer" className="font-semibold" color="black" bg="white" id="sort_by" value={selectedOption} onChange={handleSortChange}>
                {sortOptions.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </Select>
        </>

    );
};

export default SortResult;
