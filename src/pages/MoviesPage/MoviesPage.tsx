import "./style.css";
import { proxyURL, routes } from "../../utils/api";
import { Genre, Movie, UserInputFilter } from "../../utils/types";
import { useState, useEffect } from "react";
import { Container } from "@mantine/core";
import FilterComponent from "../../components/FilterComponent/FilterComponent";
import { LoaderComponent } from "../../components/LoaderComponent/LoaderComponent";
import MoviesList from "../../components/MoviesList/MoviesList";
import EmptyStateMainPage from "../../components/EmptyStateMainPage/EmptyStateMainPage";
import PageHeaderTitle from "../../components/PageHeaderTitle/PageHeaderTitle";
import { getFilterDataFromURL } from "../../utils/functions";

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
    sortBy: { label: "Most Popular", value: "popularity.desc" },
  });
  const [initialLoad, setIsInitialLoad] = useState(false);
  const [genresLoaded, setGenresLoaded] = useState(false);

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
    const initialFilterData = getFilterDataFromURL();
    setFilterData(initialFilterData);
    console.log(initialFilterData, "initialFilterData");
    setIsInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;

    console.log("Filter or page changed", filterData, currentPage);
    setIsLoading(true);
    const params = new URLSearchParams();
    if (filterData.selectedGenres.length > 0) {
      params.append("with_genres", filterData.selectedGenres.join(","));
    }
    if (filterData.selectedYears !== null) {
      params.append("primary_release_year", filterData.selectedYears.value);
    }
    if (filterData.ratingFrom !== null) {
      params.append("vote_average.gte", filterData.ratingFrom.value);
    }
    if (filterData.ratingTo !== null) {
      params.append("vote_average.lte", filterData.ratingTo.value);
    }
    if (filterData.sortBy !== null) {
      params.append("sort_by", filterData.sortBy.value);
    } else {
      params.append("sort_by", "popularity.desc");
    }
    params.append("page", currentPage.toString());

    const urlWithParams = `${moviesURL}?${params.toString()}&language=en-US`;

    console.log("Fetching movies with URL:", urlWithParams);
    fetch(urlWithParams)
      .then((response) => response.json())
      .then((data) => {
        setFilms(data.results as Movie[]);
        setIsLoading(false);
      });
  }, [filterData, currentPage, initialLoad]);

  useEffect(() => {
    if (genresLoaded) return;

    console.log("Fetching genres");
    setIsLoading(true);
    fetch(genresURL)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data as Genre[]);
        setGenresLoaded(true);
        setIsLoading(false);
      });
  }, [genresLoaded]);

  return (
    <Container className="container" size={"1440px"}>
      <PageHeaderTitle textTitle={"Movies"} />
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
