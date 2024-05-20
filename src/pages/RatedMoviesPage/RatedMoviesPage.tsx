import { Container, Flex, Text } from "@mantine/core";
import "./style.css";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { useEffect, useState } from "react";
import { Genre, Movie } from "../../utils/types";
import { proxyURL, routes } from "../../utils/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import { LoaderComponent } from "../../components/LoaderComponent/LoaderComponent";
import NoRatedFilmsBanner from "../../components/NoRatedFilmsBanner/NoRatedFilmsBanner";

export default function RatedMoviesPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [films, setFilms] = useState<Movie[]>([]);

  const genresURL = `${proxyURL}${routes.genres}`;

  useEffect(() => {
    const storedFilms = JSON.parse(`${localStorage.getItem("cardsRated")}`);
    setFilms(storedFilms);
  }, []);

  useEffect(() => {
    if (films.length > 0) {
      setIsLoading(true);
      fetch(genresURL)
        .then((response) => response.json())
        .then((data) => {
          setGenres(data as Genre[]);
          setIsLoading(false);
        });
    }
  }, []);

  if (films.length === 0) {
    return <NoRatedFilmsBanner />;
  }

  return (
    <Container className="container-rated" size={"1440px"}>
      <Flex justify={"space-between"} pb={16}>
        <Text
          fw={700}
          style={{
            fontSize: "32px",
            fontFamily: "Inter",
            lineHeight: "44.8px",
          }}
        >
          Rated movies
        </Text>
        <SearchInput />
      </Flex>
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
