import React from "react";
import { Slider } from "antd";

interface FilterRatingProps {
    labelText: string;
    min: number;
    max: number;
    minRating: number;
    maxRating: number;
    handleRatingChange: (minRating: number, maxRating: number) => void;
}

const FilterRating: React.FC<FilterRatingProps> = ({
    labelText,
    min,
    max,
    minRating,
    maxRating,
    handleRatingChange,
}) => {
    const handleChange = (values: [number, number]) => {
        const [minVal, maxVal] = values;
        handleRatingChange(minVal, maxVal);
    };

    return (
        <div>
            <div>
                {labelText}
            </div>
            <Slider
                range
                min={min}
                max={max}
                defaultValue={[minRating, maxRating]}
                onChange={handleChange} // @ts-ignore

            />
        </div>
    );
};

export default FilterRating;
