import { Card, Flex, Group, Text, Image } from "@mantine/core";
import { Genre, MovieDetails } from "../../utils/types";
import { getStarImage } from "../../utils/getStarImage";
import { formatNumber } from "../../utils/functions";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import RatingModal from "../RatingModal/RatingModal";

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
  const formattedBudget = budget
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `$${formattedBudget}`;
}

function formatDate(dateString: string): string {
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
  return arr.map((item) => item.name).join(", ");
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
};

export default function MovieDetailsCard({
  movieDetails = defaultMovieDetails,
}: {
  movieDetails?: MovieDetails;
}) {
  const savedRating = localStorage.getItem(`${movieDetails.id}`);

  const [rating, setRating] = useState(Number(savedRating));
  const [opened, { open, close }] = useDisclosure(false);

  const handleRemoveRating = () => {
    localStorage.removeItem(`${movieDetails.id}`);
    setRating(0);
    close();
  };

  const handleSaveRating = () => {
    localStorage.setItem(`${movieDetails.id}`, rating.toString());
    close();
  };

  const handleClose = () => {
    if (localStorage.getItem(`${movieDetails.id}`) === null) {
      setRating(0);
      close();
    } else {
      close();
    }
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
      <Card p={24} radius={12} mt={20} h={"400px"}>
        <Group
          justify="space-between"
          gap={16}
          style={{ flexWrap: "nowrap" }}
          align="flex-start"
        >
          <Image
            src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
            height={352}
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
                {movieDetails.release_date.slice(0, 4)}
              </Text>
              <Group justify="flex-start" gap={4}>
                <img width={"28px"} src={getStarImage("yellow")} />
                <Text fw={600} style={{ fontSize: "16px" }}>
                  {movieDetails.vote_average.toFixed(1)}
                </Text>
                <Text pl={4}>({formatNumber(movieDetails.vote_count)})</Text>
              </Group>
            </Flex>
            <Group gap={8}>
              {fillData(titlesArray, "#7B7C88")}
              {fillData(dataArray, "#000000")}
            </Group>
          </Flex>
          <div className="rating-container" style={{ paddingRight: "24px" }}>
            <img
              width={"28px"}
              src={getStarImage(savedRating?.toString())}
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            />
            <Text className="rating-star">{savedRating}</Text>
          </div>
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
