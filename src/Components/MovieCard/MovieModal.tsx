import { useState, useEffect } from "react";
import Image from 'next/image';
import { StarIcon } from "@heroicons/react/16/solid";
import { fetchMovieCastByMovieId } from "@/Service/tmdbService";
import { MovieCast } from "@/app/types/Movie";

type MovieModalProps = {
    isOpen: boolean,
    id: number,
    image: string,
    title: string,
    description: string,
    date: string,
    rating: number,
    onClose: () => void,
}

export const MovieModal = ({ id, image, title, description, date, rating, isOpen, onClose }: MovieModalProps) => {
    const [cast, setCast] = useState<MovieCast[]>([]);
    
    const closeModal = () => {
        onClose();
        enableScroll();
    }

    useEffect(() => {
        if (isOpen) {
            const fetchCast = async () => {
                const fetchedData = await fetchMovieCastByMovieId(id);
                setCast(fetchedData.slice(0, 1)); // Only display the first cast member
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

    const formattedDate = (dateString: string): string => {
        const months: string[] = [
            "Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];

        const date: Date = new Date(dateString);
        const month: string = months[date.getMonth()];
        const day: number = date.getDate();
        const year: number = date.getFullYear();

        return `${month} ${day}, ${year}`;
    };

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
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={handleBackgroundClick}>
                    <div className="bg-white rounded-lg shadow-lg max-w-md">
                        <div className="p-4">
                            <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg bg-gray-200">
                                <Image
                                    src={`${process.env.IMAGE_URL}w500${image}?api_key=${process.env.DATA_API_KEY}`}
                                    alt="Movie Poster"
                                    width={500}
                                    height={300}
                                />
                            </div>
                            <h2 className="text-xl font-bold mt-4 text-gray-600">{title}</h2>
                            <p className="mt-2 text-gray-600">{formattedDateString}</p>
                            <div className="flex items-center mt-2">
                                <p className="text-lg font-medium text-gray-900">{roundedRating}</p>
                                <StarIcon className="w-6 h-6 ml-1 text-yellow-500" />
                            </div>
                            <p className="mt-2">{description}</p>
                            
                            {/* Display cast members in a horizontally scrollable card */}
                            <div className="mt-4 flex overflow-x-auto">
                                {cast.map(member => (
                                    <div key={member.id} className="flex-shrink-0 mr-4">
                                        {member.profile_path && (
                                            <div className="h-12 w-12">
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/original${member.profile_path}`}
                                                    alt={member.name}
                                                    width={48}
                                                    height={48}
                                                    className="rounded-full"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-lg font-medium text-gray-900">{member.name}</p>
                                            <p className="text-sm text-gray-600">{member.character}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
