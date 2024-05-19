/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Flex, Group, Text, Image } from "@mantine/core";
import { Genre, Movie, MovieDetails } from "../../utils/types";
import { getStarImage } from "../../utils/getStarImage";
import {
  displayBlock,
  filmReleaseDate,
  formatNumber,
  getValueById,
  voteAverateToFixed,
} from "../../utils/functions";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import RatingModal from "../RatingModal/RatingModal";
import { getImgUrl } from "../../utils/getImage";
import "./style.css";
import { proxyURL, routes } from "../../utils/api";
type DataType = string | number;

function fillData(arr: DataType[], color: string) {
  return (
    <Flex direction={"column"} gap={12}>
      {arr.map((item: DataType, index: number) => (
        <Text
          ff={"Inter"}
          fw={400}
          style={{
            lineHeight: "20px",
            color: color,
          }}
          key={index}
        >
          {item}
        </Text>
      ))}
    </Flex>
  );
}
function formatBudget(budget: number): string {
  if (!budget) {
    return "";
  }
  const formattedBudget = budget
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `$${formattedBudget}`;
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const date: Date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

function formatDuration(minutes: number): string {
  const hours: number = Math.floor(minutes / 60);
  const remainingMinutes: number = minutes % 60;

  const formattedHours: string = hours.toString().padStart(1, "0");
  const formattedMinutes: string = remainingMinutes.toString().padStart(2, "0");

  return `${formattedHours}h ${formattedMinutes}m`;
}

function getGenresFromArray(arr: Genre[]) {
  if (!arr) {
    return "";
  }
  return arr
    .map((item) => item.name)
    .slice(0, 3)
    .join(", ");
}

const defaultMovieDetails: MovieDetails = {
  budget: 0,
  genres: [],
  id: 0,
  original_title: "",
  overview: "",
  poster_path: "",
  production_companies: [],
  release_date: "",
  revenue: 0,
  runtime: 0,
  vote_average: 0,
  vote_count: 0,
  rating: 0,
};

export default function MovieDetailsCard({
  movieDetails = defaultMovieDetails,
}: {
  movieDetails?: MovieDetails;
}) {
  const savedRatingArray = JSON.parse(`${localStorage.getItem("cardsRated")}`);
  const savedRating = getValueById(savedRatingArray, movieDetails.id);

  const [rating, setRating] = useState(savedRating);
  const [opened, { open, close }] = useDisclosure(false);

  const handleRemoveRating = () => {
    const arr: Movie[] = JSON.parse(`${localStorage.getItem("cardsRated")}`);
    const updatedArr = arr.filter((movie) => movie.id !== movieDetails.id);
    localStorage.setItem("cardsRated", JSON.stringify(updatedArr));

    setRating(0);
    close();
  };

  const handleSaveRating = () => {
    const arr = JSON.parse(`${localStorage.getItem("cardsRated")}`);
    const existingFilmIndex = arr.findIndex((item: any) => item.id === movieDetails.id);
    if (existingFilmIndex !== -1) {
      arr[existingFilmIndex].rating = rating;
    } else {
      movieDetails.rating = rating;
      arr.push(movieDetails);
    }
    localStorage.setItem("cardsRated", JSON.stringify(arr));
    close();  };

  const handleClose = () => {
    setRating(savedRating);
    close();
  };

  const titlesArray = [
    "Duration",
    "Premiere",
    "Budget",
    "Gross worldwide",
    "Genres",
  ];

  const dataArray = [
    formatDuration(movieDetails.runtime),
    formatDate(movieDetails.release_date),
    formatBudget(movieDetails.budget),
    formatBudget(movieDetails.revenue),
    getGenresFromArray(movieDetails.genres),
  ];

  return (
    <>
      <Card
        p={24}
        radius={12}
        mt={20}
        className="movie-details-card" /* h={"400px"} */
      >
        <Group
          className=""
          justify="space-between"
          gap={16}
          style={{ flexWrap: "nowrap" }}
          align="flex-start"
        >
          <Image
            className="poster-details"
            src={`${proxyURL}${routes.poster}?poster_path=${movieDetails.poster_path}`}
            fallbackSrc={getImgUrl("noposterBig.png")}
            height={352}
            width={250}
            alt={movieDetails.original_title}
          />
          <Flex
            direction="column"
            justify={"space-between"}
            h={"100%"}
            w={"100%"}
          >
            <Flex direction={"column"} gap={8}>
              <Text
                fw={600}
                style={{
                  fontSize: "20px",
                  lineHeight: "24.2px",
                  color: "#9854F6 ",
                }}
              >
                {movieDetails.original_title}
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  lineHeight: "19.36px",
                  color: "#7B7C88",
                }}
              >
                {filmReleaseDate(movieDetails.release_date)}
              </Text>
              <Group justify="flex-start" gap={4}>
                <Image width={"28px"} src={getStarImage("yellow")} />
                <Text fw={600} style={{ fontSize: "16px" }}>
                  {voteAverateToFixed(movieDetails.vote_average)}
                </Text>
                <Text pl={4}>{formatNumber(movieDetails.vote_count)}</Text>
              </Group>
            </Flex>
            <Group gap={8}>
              {fillData(titlesArray, "#7B7C88")}
              {fillData(dataArray, "#000000")}
            </Group>
          </Flex>
          <Group
            gap={4}
            justify="flex-end"
            align="flex-start"
            style={{ flexWrap: "nowrap" }}
          >
            <img
              src={getStarImage(savedRating)}
              alt="star"
              width={"28px"}
              height={"28px"}
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            />
            <Text style={{ display: displayBlock(savedRating) }}>
              {savedRating}
            </Text>
          </Group>
        </Group>
      </Card>
      <RatingModal
        film={movieDetails}
        rating={rating}
        setRating={setRating}
        opened={opened}
        onClose={handleClose}
        handleSaveRating={handleSaveRating}
        handleRemoveRating={handleRemoveRating}
      />
    </>
  );
}
