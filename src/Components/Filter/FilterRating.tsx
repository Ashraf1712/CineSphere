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
    const handleChange = (values: number[]) => {
        const [minVal, maxVal] = values;
        handleRatingChange(minVal, maxVal);
    };

    return (
        <div>
            <div>{labelText}</div>
            <div className="flex items-center">
                <label className="mr-2">0</label>
                <Slider
                    range
                    min={min}
                    max={max}
                    defaultValue={[minRating, maxRating]}
                    onChange={handleChange}
                    className="flex-1"
                />
                <label className="ml-2">10</label>
            </div>
        </div>
    );
};

export default FilterRating;
