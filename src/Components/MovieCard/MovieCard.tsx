import { useState } from "react";
import Image from 'next/image';
import { StarIcon } from "@heroicons/react/16/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { MovieModal } from "./MovieModal";
import formattedDate from "@/utils/helper";
import defaultMovieImage from "@/../public/noimage.png";

type MovieCardProps = {
    id: number,
    image: string | null,
    title: string,
    description: string,
    date: string
    rating: number,
}

export const MovieCard = ({ id, image, title, description, date, rating }: MovieCardProps) => {
    const [toggle, setToggle] = useState(false);

    const formattedDateString: string = formattedDate(date);
    const roundedRating: string = rating.toFixed(1);

    const handleModalOpen = () => {
        setToggle(true);
    }

    const handleModalClose = () => {
        setToggle(false);
    }

    return (
        <div className="mx-auto max-w-2xl px-16 py-16 lg:px-2 sm:px-4  w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full transform transition-transform duration-300 hover:scale-105">
                <a onClick={handleModalOpen} className="group cursor-pointer">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        {image ? (
                            <Image
                                src={`${process.env.IMAGE_URL}w500${image}?api_key=${process.env.DATA_API_KEY}`}
                                alt="Movie Poster"
                                width={500}
                                height={300}
                            />
                        ) : (
                            <Image
                                src={defaultMovieImage}
                                alt="Movie Poster"
                                width={500}
                                height={300}
                            />
                        )}
                    </div>
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg text-gray-700 font-bold">{title}</h3>
                            <p className="text-lg font-medium text-gray-900">{formattedDateString}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="text-lg font-medium text-gray-900">{roundedRating}</p>
                            <StarIcon className="w-6 h-6 ml-1 text-yellow-500" />
                        </div>
                    </div>
                </a>
            </div>
            <MovieModal
                id={id}
                image={image}
                title={title}
                description={description}
                date={date}
                rating={rating}
                isOpen={toggle}
                onClose={handleModalClose}
            />
        </div>
    );
}
