import { useState, useEffect } from "react";
import Image from 'next/image';
import { XMarkIcon } from "@heroicons/react/16/solid";
import { fetchMovieCastByMovieId } from "@/Service/tmdbService";
import { MovieCast } from "@/types/Movie";
import { formattedDate } from "@/utils/helper";
import BlankProfile from "@/../public/blankProfile.png"
import IMDBIcon from "@/../public/imdbIcon.png"
import { Button, CloseButton } from "@chakra-ui/react";

type MovieModalProps = {
    isOpen: boolean;
    id: number;
    image: string | null;
    title: string;
    description: string;
    date: string;
    rating?: number;
    onClose: () => void;
    genreNames?: string[];
}

export const MovieModal = ({ id, image, title, description, date, rating, isOpen, onClose, genreNames }: MovieModalProps) => {
    const [cast, setCast] = useState<MovieCast[]>([]);
    const year = new Date(date).getFullYear();
    const genreNamesArray = genreNames || [];

    const closeModal = () => {
        onClose();
        enableScroll();
    }

    useEffect(() => {
        if (isOpen) {
            const fetchCast = async () => {
                const fetchedData = await fetchMovieCastByMovieId(id);
                setCast(fetchedData.slice(0, 10));
            }
            fetchCast();
            disableScroll();
        } else {
            enableScroll();
        }
    }, [isOpen, id]);

    const disableScroll = () => {
        document.body.style.overflow = 'hidden';
    }

    const enableScroll = () => {
        document.body.style.overflow = 'auto';
    }

    const formattedDateString: string = formattedDate(date);
    const roundedRating: string = rating ? rating.toFixed(1) : '0.0';

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            closeModal();
            enableScroll();
        }
    };

    return (
        <>
            {isOpen && (

                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-md bg-black bg-opacity-50 z-50 p-5" onClick={handleBackgroundClick}>

                    <div className="bg-gray-600 rounded-lg shadow-lg max-w-screen-md w-full h-full overflow-y-auto p-3 relative">
                        <div className="justify-end flex">
                            <CloseButton size='lg' color={"white"} onClick={closeModal} />
                        </div>

                        <div className="p-2 grid grid-rows-2 grid-flow-col gap-4  ">
                            {/* Movie Poster */}
                            <div className="  p-4 row-span-2">
                                <Image
                                    className="rounded-lg"
                                    src={`${process.env.IMAGE_URL}w500${image}?api_key=${process.env.DATA_API_KEY}`}
                                    alt="Movie Poster"
                                    width={600}
                                    height={900}
                                />
                            </div>
                            {/* Movie Details */}
                            <div className="row-span-2">
                                <p className="text-4xl font-extrabold pt-4 text-white pb-2">{title} <span className=" font-light text-slate-200">({year})</span></p>
                                <div className="flex items-center ">
                                    <p className=" text-white pr-2">
                                        {formattedDateString}
                                    </p>
                                    <div className="text-white pr-2">•</div>
                                    {/* GENRE HERE */}
                                    <div className={`col-span-${genreNamesArray.length} md:flex`}>
                                        {genreNamesArray.map((genre, index) => (
                                            <div key={index} >
                                                <span className="font-normal text-white ">{genre}</span>
                                                {index !== genreNamesArray.length - 1 && <span className="font-bold text-white"> ,</span>}
                                            </div>
                                        ))}

                                    </div>
                                    <div className="text-white pl-2">•</div>

                                    <p className="text-md font-medium text-white pl-2 pr-1">{roundedRating}</p>
                                    <Image src={IMDBIcon} alt="ratingIcon" height={32} width={32} />

                                </div>

                                <p className="mt-2 text-white col-span-2">{description}</p>
                            </div>
                        </div>
                        {/* Cast Section */}
                        <div className="mt-3 md:pt-4">
                            <div className="pl-2 text-xl font-semibold text-white">Cast</div>
                            <div className="flex overflow-x-auto gap-4 p-2">
                                {cast.map(member => (
                                    <div key={member.id} className="flex-shrink-0 mr-4">
                                        <div className=" rounded-lg shadow-lg overflow-hidden w-28 h-full">
                                            <a className="group">
                                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg xl:aspect-h-8 xl:aspect-w-7">
                                                    {member.profile_path ? <Image
                                                        src={`https://image.tmdb.org/t/p/original${member.profile_path}`}
                                                        alt={member.name}
                                                        width={300}
                                                        height={300}
                                                    /> :
                                                        <Image
                                                            src={BlankProfile}
                                                            alt={member.name}
                                                            width={300}
                                                            height={300}
                                                        />}
                                                </div>
                                                <div className="p-4 bg-white h-full">
                                                    <p className="text-sm text-gray-700 font-bold">{member.name}</p>
                                                    <p className="text-sm text-gray-600">{member.character}</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 justify-end flex">
                                <Button onClick={closeModal}>Close</Button>
                            </div>

                        </div>

                    </div>
                </div>
            )}



        </>

    );
}
