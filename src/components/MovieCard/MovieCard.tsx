/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import { Genre, Movie } from "../../utils/types";
import { Card, Flex, Group, Image, Text } from "@mantine/core";
import {
  fillGenresArray,
  filmReleaseDate,
  formatNumber,
  voteAverateToFixed,
} from "../../utils/functions";
import { getStarImage } from "../../utils/getStarImage";
import { useNavigate } from "react-router-dom";
import RatingModal from "../RatingModal/RatingModal";
import { getImgUrl } from "../../utils/getImage";
import { proxyURL, routes } from "../../utils/api";

export default function MovieCard({
  film,
  genres,
  setFilteredFilms,
}: {
  film: Movie;
  setFilteredFilms: any;
  genres: Genre[];
}) {
  const getGenresNames = (genreIds: number[], genres: Genre[]): string[] => {
    return genres
      .filter((genre) => genreIds.includes(genre.id))
      .map((genre) => genre.name);
  };

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/movies/${film.id}`);
  };

  const filmGenresNames = getGenresNames(film.genre_ids || [], genres);
  const handleRatingClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Card
      radius={12}
      className="movie-card"
      w="100%"
      maw={{ xs: "482px", base: "482px" }}
      p={24}
      onClick={handleCardClick}
    >
      <Group
        justify="space-between"
        gap={16}
        style={{ flexWrap: "nowrap" }}
        align="flex-starts"
      >
        <Image
          src={`${proxyURL}${routes.poster}?poster_path=${film.poster_path}`}
          height={170}
          width={119}
          fallbackSrc={getImgUrl("noposterBig.png")}
          alt={film.original_title}
        />
        <Flex direction={"column"} justify={"space-between"} w={"100%"}>
          <Flex direction={"column"} gap={8}>
            <Text
              fw={600}
              style={{
                color: "#9854F6",
                fontSize: "20px",
                fontFamily: "Inter",
                lineHeight: "24.2px",
              }}
            >
              {film.original_title}
            </Text>
            <Text
              fw={400}
              style={{
                fontFamily: "Inter",
                fontSize: "16px",
                lineHeight: "20px",
                color: "#7B7C88",
              }}
            >
              {filmReleaseDate(film.release_date)}
            </Text>
            <Group gap={4}>
              <Image
                src={getStarImage("yellow")}
                alt="star"
                width={"28px"}
                height={"28px"}
              />
              <Text
                fw={600}
                style={{
                  fontFamily: "Inter",
                  lineHeight: "20px",
                  fontSize: "16px",
                }}
              >
                {voteAverateToFixed(film.vote_average)}
              </Text>
              <Text
                pl={4}
                fw={400}
                style={{
                  fontSize: "16px",
                  lineHeight: "19.36px",
                  color: "#7B7C88",
                  fontFamily: "Inter",
                }}
              >
                {formatNumber(film.vote_count)}
              </Text>
            </Group>
          </Flex>
          <Group gap={8}>
            <Text
              fw={400}
              style={{
                color: "#7B7C88",
                fontSize: "16px",
                lineHeight: "19.36px",
                fontFamily: "Inter",
              }}
            >
              Genres
            </Text>
            <Text
              fw={400}
              style={{
                fontFamily: "Inter",
                fontSize: "16px",
                lineHeight: "20px",
              }}
            >
              {fillGenresArray(filmGenresNames)}
            </Text>
          </Group>
        </Flex>
        <div onClick={handleRatingClick}>
          <RatingModal film={film} setFilteredFilms={setFilteredFilms} />
        </div>
      </Group>
    </Card>
  );
}
