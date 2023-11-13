import { LazyLoadImage } from "react-lazy-load-image-component";

interface CardProps {
  cardData: {
    adult: boolean;
    backdrop_path: string;
    name?: string | undefined;
    first_air_date?: string | undefined;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
}

function CardComponent({ cardData }: CardProps) {
  return (
    <div className="h-40 flex rounded shadow border md:h-96 md:flex-col">
      <div className="w-32 h-full flex-none md:w-full md:h-0 md:grow">
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/w500/${cardData.poster_path}`}
          alt="poster"
          className="rounded-tl rounded-bl md:rounded-t md:rounded-bl-none w-full h-full"
        />
      </div>

      <div className="grow p-4 md:flex-none md:h-28">
        <div className="font-medium text-tertiary-color uppercase">
          {cardData.media_type}
        </div>

        <p className="font-bold md:truncate hover:text-secondary-color cursor-pointer">
          {cardData.title ? cardData.title : cardData.name}
        </p>
        <p className="text-gray-400 font-thin text-sm">
          {cardData.release_date
            ? cardData.release_date
            : cardData.first_air_date}
        </p>
      </div>
    </div>
  );
}

export default CardComponent;
