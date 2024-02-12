import React from 'react';

interface PaginationProps {
    onClickPrev: () => void;
    onClickNext: () => void;
}

const PaginationButton: React.FC<PaginationProps> = ({ onClickPrev, onClickNext }) => {
    return (
        <ul className="flex list-none items-center justify-center text-sm md:gap-1">
            <li>
                <button
                    type="button"
                    onClick={onClickPrev}
                    aria-label="Goto Page 1"
                    className="inline-flex h-10 items-center justify-center gap-4 rounded px-4 text-sm font-medium text-neutral-200 transition duration-300 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white focus-visible:outline-none"
                >
                    <span className="order-2">Prev</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="-mx-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-09 desc-09"
                    >
                        <title id="title-09">Previous page</title>
                        <desc id="desc-09">link to previous page</desc>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
            </li>

            <li>
                <button
                    type="button"
                    onClick={onClickNext}
                    aria-label="Goto Page 3"
                    className="inline-flex h-10 items-center justify-center gap-4 rounded px-4 text-sm font-medium text-neutral-200 transition duration-300 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white focus-visible:outline-none"
                >
                    <span>Next </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="-mx-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        role="graphics-symbol"
                        aria-labelledby="title-10 desc-10"
                    >
                        <title id="title-10">Next page</title>
                        <desc id="desc-10">link to next page</desc>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </li>
        </ul>
    );
};

export default PaginationButton;
