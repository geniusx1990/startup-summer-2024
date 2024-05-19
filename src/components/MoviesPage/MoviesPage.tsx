import "./style.css";
import { proxyURL, routes } from "../../utils/api";
import { Genre, Movie, UserInputFilter } from "../../utils/types";
import MoviesList from "../MoviesList/MoviesList";
import FilterComponent from "../FilterComponent/FilterComponent";
import { useState, useEffect } from "react";
import { LoaderComponent } from "../LoaderComponent/LoaderComponent";
import { Container } from "@mantine/core";

export default function MoviesPage() {
  const [films, setFilms] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    setIsLoading(true);
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
    params.append("page", currentPage.toString());

    const urlWithParams = `${moviesURL}?${params}&language=en-US`;

    fetch(urlWithParams)
      .then((response) => response.json())
      .then((data) => {
        setFilms(data.results as Movie[]);
        setIsLoading(false);
      });
  }, [filterData, currentPage]);

  useEffect(() => {
    fetch(genresURL)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data as Genre[]);
        setIsLoading(false);
      });
  }, []);

  return (
    <Container className="container" size={"1440px"}>
      <h1 className="movies-container__title">Movies</h1>
      <FilterComponent genres={genres} onUpdateFilter={updateFilterData} />
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <MoviesList
          films={films}
          genres={genres}
          onChange={(activePage: number) => setCurrentPage(activePage)}
          currentPage={currentPage}
        />
      )}
    </Container>
  );
}
