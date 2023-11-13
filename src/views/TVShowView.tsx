import { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import axios from "axios";

interface Movie {
  adult: boolean;
  backdrop_path: string;
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
}

interface FetchTrendMovie {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

function TVShowView() {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataMovie, setDataMovie] = useState<FetchTrendMovie | undefined>();

  useEffect(() => {
    const handleScroll = async () => {
      if (
        Math.ceil(window.innerHeight + document.documentElement.scrollTop) ===
        document.documentElement.offsetHeight
      ) {
        setIsLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjg2OTA2ZGRjNGJlYTczZjA3ZWIyZWI1Y2ZhNjBjYiIsInN1YiI6IjY1NDljMmNjNDFhNTYxMzM2YzVlMTFjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BCSzlGtlloCHqeHHoQz7tve0sTjWJ66NJi79ga-eESs",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (!dataMovie) {
          setDataMovie(response.data);
        } else {
          setDataMovie((prevDataMovie) => {
            if (prevDataMovie) {
              let newDataMovie = { ...prevDataMovie };
              newDataMovie.results = [
                ...newDataMovie.results!,
                ...response.data.results,
              ];
              return newDataMovie;
            }
          });
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        console.error(error);
        setIsLoading(false);
      });
  }, [page, isLoading]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-white opacity-70 blur"></div>
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center text-xl z-10 font-bold text-primary-color">
            LOADING...
          </div>
        </>
      ) : (
        <></>
      )}

      <h1 className="font-bold">All TV Show</h1>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-8">
        {dataMovie &&
          dataMovie.results.map((item) => {
            return <CardComponent key={item.id.toString()} cardData={item} />;
          })}
      </div>
    </>
  );
}

export default TVShowView;
