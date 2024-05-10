import "./style.css";
import { proxyURL, routes } from "../../utils/api";
import { Genre, Movie } from "../../utils/types";
import MoviesList from "../MoviesList/MoviesList";
import FilterComponent from "../FilterComponent/FilterComponent";
import { useMantineTheme } from "@mantine/core";
import { useState, useEffect } from "react";

export default function MoviesPage() {
  const [films, setFilms] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  //const [filterTextValue, setTextValue] = useState("");

  const moviesURL = `${proxyURL}${routes.movies}`;
  const genresURL = `${proxyURL}${routes.genres}`;

  function onFilterValueSelected(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log(event.target.value);
    //const x = event.target.value.toString();
    // setTextValue(x);
  }

  const theme = useMantineTheme();
  useEffect(() => {
    fetch(moviesURL)
      .then((response) => response.json())
      .then((data) => setFilms(data.results as Movie[]));

    fetch(genresURL)
      .then((response) => response.json())
      .then((data) => setGenres(data as Genre[]));
  }, []);

  return (
    <div
      className="movies-container"
      style={{ backgroundColor: theme.colors.gray[2] }}
    >
      <h1 className="movies-container__title">Movies Page</h1>
      <FilterComponent
        genres={genres}
        filterValueSelected={onFilterValueSelected}
      />
      <MoviesList films={films} genres={genres} />
    </div>
  );
}
