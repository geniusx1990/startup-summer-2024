import "./style.css";
import { proxyURL, routes } from "../../utils/api";
import { Genre, Movie, UserInputFilter } from "../../utils/types";
import { useState, useEffect } from "react";
import { Container } from "@mantine/core";
import FilterComponent from "../../components/FilterComponent/FilterComponent";
import { LoaderComponent } from "../../components/LoaderComponent/LoaderComponent";
import MoviesList from "../../components/MoviesList/MoviesList";
import { Text } from "@mantine/core";
import EmptyStateMainPage from "../../components/EmptyStateMainPage/EmptyStateMainPage";

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

  const storedCardsRated = localStorage.getItem("cardsRated");
  if (!storedCardsRated) {
    localStorage.setItem("cardsRated", JSON.stringify([]));
  }

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
    setIsLoading(true);
    fetch(genresURL)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data as Genre[]);
        setIsLoading(false);
      });
  }, []);

  return (
    <Container className="container" size={"1440px"}>
      <Text mb={40} className="movies-container__title">
        Movies
      </Text>
      <FilterComponent genres={genres} onUpdateFilter={updateFilterData} />
      {isLoading ? (
        <LoaderComponent />
      ) : films.length === 0 ? (
        <EmptyStateMainPage />
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
