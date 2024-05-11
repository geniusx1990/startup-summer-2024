import "./style.css";
import { proxyURL, routes } from "../../utils/api";
import { Genre, Movie } from "../../utils/types";
import MoviesList from "../MoviesList/MoviesList";
import FilterComponent from "../FilterComponent/FilterComponent";
import { ComboboxItem, useMantineTheme } from "@mantine/core";
import { useState, useEffect } from "react";
import { years } from "../../utils/arrayYears";

export default function MoviesPage() {
  const [films, setFilms] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [ratingFrom, setRatingFrom] = useState<ComboboxItem | null>(null);
  const [ratingTo, setRatingTo] = useState<ComboboxItem | null>(null);

  const handleGenreChange = (newSelectedGenres: string[]) => {
    setSelectedGenres(newSelectedGenres);
  };
  const handleYearChange = (newSelectedYears: string[]) => {
    setSelectedYears(newSelectedYears);
  };

  const handleRatingFrom = (
    value: string | null,
    option: ComboboxItem | null
  ) => {
    setRatingFrom(option);
  };

  const handleRatingTo = (
    value: string | null,
    option: ComboboxItem | null
  ) => {
    setRatingTo(option);
  };

  console.log(ratingFrom);
  console.log(ratingTo);
  console.log(selectedGenres);
  console.log(selectedYears);

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
        onGenreChange={handleGenreChange}
        onYearChange={handleYearChange}
        onRatingFromChange={handleRatingFrom}
        onRatingToChange={handleRatingTo}
      />
      <MoviesList films={films} genres={genres} />
    </div>
  );
}
