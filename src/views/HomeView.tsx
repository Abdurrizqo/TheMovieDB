import CardComponent from "../components/CardComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

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

interface APIOption {
  method: string;
  url: string;
  headers: {
    accept: string;
    Authorization: string;
  };
}

function HomeView() {
  const { resultQuery }: any = useLoaderData();

  const [dataMovie, setDataMovie] = useState<FetchTrendMovie | undefined>();
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!resultQuery) {
      setIsLoading(true);
      const optionsTrenAPI: APIOption = {
        method: "GET",
        url: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjg2OTA2ZGRjNGJlYTczZjA3ZWIyZWI1Y2ZhNjBjYiIsInN1YiI6IjY1NDljMmNjNDFhNTYxMzM2YzVlMTFjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BCSzlGtlloCHqeHHoQz7tve0sTjWJ66NJi79ga-eESs",
        },
      };
      axios
        .request(optionsTrenAPI)
        .then(function (response) {
          setDataMovie(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });

      setIsLoading(false);
    } else {
      setIsLoading(true);
      const optionSearchAPI: APIOption = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/multi?query=${resultQuery}&include_adult=false&language=en-US&page=1`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjg2OTA2ZGRjNGJlYTczZjA3ZWIyZWI1Y2ZhNjBjYiIsInN1YiI6IjY1NDljMmNjNDFhNTYxMzM2YzVlMTFjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BCSzlGtlloCHqeHHoQz7tve0sTjWJ66NJi79ga-eESs",
        },
      };
      axios
        .request(optionSearchAPI)
        .then(function (response) {
          setDataMovie(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        Math.ceil(window.innerHeight + document.documentElement.scrollTop) ===
          document.documentElement.offsetHeight &&
        resultQuery
      ) {
        setIsLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [resultQuery, isLoading]);

  useEffect(() => {
    if (resultQuery) {
      const optionSearchAPI: APIOption = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/multi?query=${resultQuery}&include_adult=true&language=en-US&page=${page}`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjg2OTA2ZGRjNGJlYTczZjA3ZWIyZWI1Y2ZhNjBjYiIsInN1YiI6IjY1NDljMmNjNDFhNTYxMzM2YzVlMTFjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BCSzlGtlloCHqeHHoQz7tve0sTjWJ66NJi79ga-eESs",
        },
      };

      axios
        .request(optionSearchAPI)
        .then(function (response) {
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
        })
        .catch(function (error) {
          console.error(error);
        });
      setIsLoading(false);
    }
  }, [page, isLoading]);

  return (
    <>

          
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-50 blur"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-xl font-bold text-tertiary-color">LOADING...</div>
          <h1 className="font-bold">All Trend Today</h1>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-8">
            {dataMovie &&
              dataMovie.results.map((item) => {
                return (
                  <CardComponent key={item.id.toString()} cardData={item} />
                );
              })}
          </div>
    </>
  );
}

export default HomeView;

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const resultQuery = url.searchParams.get("search");
  return { resultQuery };
}
