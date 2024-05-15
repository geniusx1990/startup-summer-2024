import { useEffect, useState } from "react";
import { MovieDetails } from "../../utils/types";
import { proxyURL, routes } from "../../utils/api";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  const { movie_id } = useParams();

  const [movieDetail, setMovieDetail] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const movieURL = `${proxyURL}${routes.movie}?movie_id=${movie_id}`;

  useEffect(() => {
    setIsLoading(true);
    fetch(movieURL)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetail(data as MovieDetails);
        setIsLoading(false);
      });
  }, []);

  console.log(movieDetail);
  return <>{isLoading ? <div>is loading</div> : <div>loaded</div>}</>;
}
