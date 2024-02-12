import { useState, useEffect } from "react";
import Image from 'next/image';
import { XMarkIcon } from "@heroicons/react/16/solid";
import { fetchMovieCastByMovieId } from "@/Service/tmdbService";
import { MovieCast } from "@/types/Movie";
import { formattedDate } from "@/utils/helper";
import BlankProfile from "@/../public/blankProfile.png"
import IMDBIcon from "@/../public/imdbIcon.png"

type MovieModalProps = {
    isOpen: boolean,
    id: number,
    image: string | null,
    title: string,
    description: string,
    date: string,
    rating: number,
    onClose: () => void,

}

export const MovieModal = ({ id, image, title, description, date, rating, isOpen, onClose }: MovieModalProps) => {
    const [cast, setCast] = useState<MovieCast[]>([]);
    const year = new Date(date).getFullYear();

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
    const roundedRating: string = rating.toFixed(1);

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            closeModal();
            enableScroll();
        }
    };

    return (
        <>
            {isOpen && (
                // TODO: ADD X BUTTON ON TOP RIGHT CORNER
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 p-5" onClick={handleBackgroundClick}>
                    <div className="bg-neutral-500 rounded-lg shadow-lg max-w-screen-md w-full h-full overflow-y-auto p-3 relative">
                        <div className="p-2 flex flex-col md:flex-row">
                            {/* Movie Poster */}
                            <div className="rounded-lg  p-4">
                                <Image
                                    className="rounded-lg"
                                    src={`${process.env.IMAGE_URL}w500${image}?api_key=${process.env.DATA_API_KEY}`}
                                    alt="Movie Poster"
                                    width={600}
                                    height={900}
                                />
                            </div>
                            {/* Movie Details */}
                            <div>
                                <h2 className="text-4xl font-extrabold mt-4 text-white">{title} <span className=" font-light text-slate-200">({year})</span></h2>
                                <p className="mt-2 text-white flex items-center">
                                    {formattedDateString}
                                    <span className="pl-2 ml-2 flex items-center gap-2">
                                        <p className="text-lg font-medium text-white">{roundedRating}</p>
                                        {/* <StarIcon className="w-6 h-6 ml-1 text-yellow-500" /> */}
                                        <Image src={IMDBIcon} alt="ratingIcon" height={32} width={32} />

                                    </span>
                                </p>
                                <p className="mt-2 text-white">{description}</p>
                            </div>
                        </div>
                        {/* Cast Section */}
                        <div className="mt-3 md:mt-20">
                            <div className="pl-2 text-xl font-semibold text-white">Cast</div>
                            <div className="flex overflow-x-auto gap-4 p-2">
                                {cast.map(member => (
                                    <div key={member.id} className="flex-shrink-0 mr-4">
                                        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-28 h-full">
                                            <a className="group">
                                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
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
                                                <div className="p-4">
                                                    <p className="text-sm text-gray-700 font-bold">{member.name}</p>
                                                    <p className="text-sm text-gray-600">{member.character}</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                // TODO: ADD CLOSE BUTTON ON BOTTOM RIGHT CORNER
            )}



        </>

    );
}
