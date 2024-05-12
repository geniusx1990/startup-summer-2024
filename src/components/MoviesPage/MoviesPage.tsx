import "./style.css";
import { proxyURL, routes } from "../../utils/api";
import { Genre, Movie, UserInputFilter } from "../../utils/types";
import MoviesList from "../MoviesList/MoviesList";
import FilterComponent from "../FilterComponent/FilterComponent";
import { useMantineTheme } from "@mantine/core";
import { useState, useEffect } from "react";

export default function MoviesPage() {
  const [films, setFilms] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const theme = useMantineTheme();
  const [totalPages, setTotalPages] = useState(null);
  const [filterData, setFilterData] = useState<UserInputFilter>({
    selectedGenres: [],
    selectedYears: null,
    ratingFrom: null,
    ratingTo: null,
    sortBy: null,
  });

  const updateFilterData = (newFilterData: UserInputFilter) => {
    setFilterData(newFilterData);
  };

  const moviesURL = `${proxyURL}${routes.movies}`;
  const genresURL = `${proxyURL}${routes.genres}`;
  console.log(totalPages);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filterData.selectedGenres.length > 0) {
      params.append("with_genres", filterData.selectedGenres.join(","));
    }
    if (filterData.selectedYears !== null) {
      params.append("primary_release_year", filterData.selectedYears);
    }

    if (filterData.ratingFrom !== null) {
      params.append("vote_average.gte", filterData.ratingFrom);
    }
    if (filterData.ratingTo !== null) {
      params.append("vote_average.lte", filterData.ratingTo);
    }

    if (filterData.sortBy !== null) {
      params.append("sort_by", filterData.sortBy);
    } else {
      params.append("sort_by", "popularity.desc");
    }

    const urlWithParams = `${moviesURL}?${params}&language=en-US`;

    fetch(urlWithParams)
      .then((response) => response.json())
      .then((data) => {
        setFilms(data.results as Movie[]);
        setTotalPages(data.total_pages);
      });
  }, [filterData]);
  useEffect(() => {
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
      <FilterComponent genres={genres} onUpdateFilter={updateFilterData} />
      <MoviesList films={films} genres={genres} />
    </div>
  );
}
