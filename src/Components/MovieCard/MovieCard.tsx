import { useState } from "react";
import Image from 'next/image';
import IMDBIcon from "@/../public/imdbIcon.png"
import { StarIcon } from "@heroicons/react/16/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { MovieModal } from "./MovieModal";
import { formattedDate } from "@/utils/helper";
import defaultMovieImage from "@/../public/noimage.png";
import { Genre, genres } from '@/types/Movie';


type MovieCardProps = {
    id: number,
    image: string | null,
    title: string,
    description: string,
    date: string
    rating: number,
    genreId: number[],
}

export const MovieCard = ({ id, image, title, description, date, rating, genreId }: MovieCardProps) => {
    const [toggle, setToggle] = useState(false);
    const formattedDateString: string = formattedDate(date);
    const roundedRating: string = rating.toFixed(1);

    const handleModalOpen = () => {
        setToggle(true);
    }

    const handleModalClose = () => {
        setToggle(false);
    }

    const genreNames = genreId.map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.genre : '';
    });


    return (
        // <div className="w-full max-w-2xl px-16 py-16 mx-auto lg:px-2 sm:px-4 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
        <div className="h-auto mx-auto w-full ">
            <div className="transition-transform duration-300 transform  rounded-md shadow-lg h-300 hover:scale-105">
                <a onClick={handleModalOpen} className="cursor-pointer group">
                    <div className="relative rounded-t-lg w-500">
                        {image ? (
                            <Image
                                src={`${process.env.IMAGE_URL}w500${image}?api_key=${process.env.DATA_API_KEY}`}
                                alt="Movie Poster"
                                width={500}
                                height={300}
                                className="rounded-md"
                            />
                        ) : (
                            <Image
                                src={defaultMovieImage}
                                alt="Movie Poster"
                                width={500}
                                height={300}
                                className="rounded-md"
                            />
                        )}
                        <div className="absolute rounded-b-md h-2/3 bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-neutral-800 p-4"></div>
                        <div className="relative">
                            <div className="absolute rounded-b-md bottom-0 left-0 w-full p-4 text-white">
                                <p className="text-lg font-thin">{formattedDateString}</p>
                                <p className="text-lg font-semibold pb-4">{title}</p>
                                <div className="flex flex-wrap pr-16">
                                    {genreNames.map((genre, index) => (
                                        <div key={index}>
                                            <span className="font-bold text-red-500">{genre}</span>
                                            {index !== genreNames.length - 1 && <span className="font-bold text-gray-500"> , </span>}
                                        </div>
                                    ))}
                                </div>
                                <div id="rating" className="absolute flex items-center bottom-0 right-0 pr-4 pb-4">
                                    <p className="text-lg font-medium pr-2">{roundedRating}</p>
                                    <Image src={IMDBIcon} alt="ratingIcon" height={24} width={24} />
                                </div>
                            </div>
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
                genreNames={genreNames}
            />
        </div >
    );
}
