import { Container, Flex } from "@mantine/core";
import "./style.css";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { useEffect, useState } from "react";
import { Genre, Movie } from "../../utils/types";
import { proxyURL, routes } from "../../utils/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import { LoaderComponent } from "../../components/LoaderComponent/LoaderComponent";
import NoRatedFilmsBanner from "../../components/NoRatedFilmsBanner/NoRatedFilmsBanner";
import PageHeaderTitle from "../../components/PageHeaderTitle/PageHeaderTitle";

export default function RatedMoviesPage() {
  const [films, setFilms] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filteredFilms, setFilteredFilms] = useState<Movie[]>([]);

  const genresURL = `${proxyURL}${routes.genres}`;

  useEffect(() => {
    const storedFilms = JSON.parse(`${localStorage.getItem("cardsRated")}`);
    setFilms(storedFilms);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(genresURL)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data as Genre[]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = films.filter((film) =>
      film.original_title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredFilms(filtered);
  }, [searchText, films]);

  if (films.length === 0) {
    return <NoRatedFilmsBanner />;
  }

  return (
    <Container className="container-rated" size={"1440px"}>
      <Flex justify={"space-between"} pb={16}>
        <PageHeaderTitle textTitle="Rated movies" />
        <SearchInput onSearchTextChange={setSearchText} />
      </Flex>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <MoviesList
          films={filteredFilms}
          setFilteredFilms={setFilteredFilms}
          genres={genres}
          onChange={(activePage: number) => setCurrentPage(activePage)}
          currentPage={currentPage}
        />
      )}
    </Container>
  );
}
