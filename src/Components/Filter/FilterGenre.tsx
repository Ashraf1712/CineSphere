import React, { useRef, useEffect } from 'react';
import { Genre } from '@/types/Movie';
import { Checkbox, Box, Icon } from '@chakra-ui/react';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface FilterGenreProps {
    labelText: string;
    genres: Genre[];
    selectedGenres: number[];
    handleCheckboxChange: (genreId: number) => void;
    dropdownVisible: boolean;
    toggleDropdown: () => void;
}

const FilterGenre: React.FC<FilterGenreProps> = ({
    labelText,
    genres,
    selectedGenres,
    handleCheckboxChange,
    dropdownVisible,
    toggleDropdown
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);


    const handleBoxClick = () => {
        toggleDropdown();
    };

    return (
        <Box position="relative">
            <div className="pb-2 font-semibold">
                {labelText}
            </div>
            <Box
                bg="white"
                p={2}
                onClick={handleBoxClick}
                cursor="pointer"
                rounded={5}
                _hover={{ bg: 'gray.200' }}
                display="flex"
                alignItems="center"
            >
                <div className="text-neutral-900 font-medium pl-2">
                    Choose your {labelText}
                </div>
                <div className="text-neutral-900 absolute flex items-center bottom-0 right-0 pr-3 pb-2">
                    <Icon as={MdKeyboardArrowDown} w={5} h={5} color="neutral.900" />
                </div>
            </Box>
            {dropdownVisible && (
                <Box
                    ref={dropdownRef}
                    position="absolute"
                    top="calc(100% + 8px)"
                    left={0}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.300"
                    p={4}
                    shadow="md"
                    textColor="gray.700"
                    zIndex={20}
                    maxHeight="500px"
                    overflowY="auto"
                    minWidth={220}
                    rounded={"lg"}
                >
                    {genres.map(genre => (
                        <Box key={genre.id} className="block pb-1">
                            <Checkbox
                                value={genre.id.toString()}
                                isChecked={selectedGenres.includes(genre.id)}
                                onChange={() => handleCheckboxChange(genre.id)}
                            >
                                {genre.genre}
                            </Checkbox>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default FilterGenre;
