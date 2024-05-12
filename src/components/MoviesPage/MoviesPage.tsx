import "./style.css";
import { proxyURL, routes } from "../../utils/api";
import { Genre, Movie, UserInputFilter } from "../../utils/types";
import MoviesList from "../MoviesList/MoviesList";
import FilterComponent from "../FilterComponent/FilterComponent";
import { useMantineTheme } from "@mantine/core";
import { useState, useEffect } from "react";
import { years } from "../../utils/arrayYears";

export default function MoviesPage() {
  const [films, setFilms] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [filterData, setFilterData] = useState<UserInputFilter>({
    selectedGenres: [],
    selectedYears: [],
    ratingFrom: null,
    ratingTo: null,
  });

  const updateFilterData = (newFilterData: UserInputFilter) => {
    setFilterData(newFilterData);
  };

  console.log(filterData);
  const moviesURL = `${proxyURL}${routes.movies}`;
  const genresURL = `${proxyURL}${routes.genres}`;

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
        years={years}
        genres={genres}
        onUpdateFilter={updateFilterData}
      />
      <MoviesList films={films} genres={genres} />
    </div>
  );
}
