import { useEffect, useState } from "react";
import { Genre } from "../../utils/types";
import { proxyURL, routes } from "../../utils/api";
const genresURL = `${proxyURL}${routes.genres}`;

const useFetch = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetch(genresURL).then((response) =>
      response
        .json()
        .then((data) => {
          setGenres(data as Genre[]);
        })
        .finally(() => setIsReady(true))
    );
  }, []);

  if (isReady) return genres as unknown as { genres: Genre[] };
  return false;
};

export default useFetch;
