import { useState } from "react";
import Image from 'next/image';

type MovieCardProps = {
    id: number,
    image: string,
    title: string,
    description: string,
    date: string
    rating: number,
}


export const MovieCard = ({ id, image, title, description, date, rating }: MovieCardProps) => {
    const [toggle, setToggle] = useState(false);
    const year = new Date(date).getFullYear();


    return (
        <>
          <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 h-full">
            {/* Image */}
            <figure>
              <Image
                src={`${process.env.IMAGE_URL}w500${image}?api_key=${process.env.DATA_API_KEY}`}
                alt="Movie Poster"
                width={500}
                height={300}
              />
            </figure>
            {/* Body */}
            <div className="p-4">
              <header className="">
                <h3 className="text-lg font-bold text-slate-700">
                  {title}
                </h3>
                <p className="text-sm text-slate-400">{year}</p>
              </header>
            </div>
          </div>
        </>
      );
      
}