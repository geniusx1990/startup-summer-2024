import { Card, Flex, Group, Text, Image } from "@mantine/core";
import { Genre, MovieDetails } from "../../utils/types";
import { getStarImage } from "../../utils/getStarImage";
import { formatNumber } from "../../utils/functions";

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

function getGenresFromArray(arr: Genre[]) {
  return arr.map((item) => item.name).join(", ");
}

export default function MovieDetailsCard({
  movieDetails,
}: {
  movieDetails: MovieDetails | undefined;
}) {
  if (!movieDetails) {
    return null;
  }

  const titlesArray = [
    "Duration",
    "Premiere",
    "Budget",
    "Gross worldwide",
    "Genres",
  ];

  const dataArray = [
    movieDetails.runtime,
    movieDetails.release_date,
    formatBudget(movieDetails.budget),
    formatBudget(movieDetails.revenue),
    getGenresFromArray(movieDetails.genres),
  ];

  return (
    <Card p={24} radius={12} mt={20} h={"400px"}>
      <Group
        justify="flex-start"
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
        <Image width={"28px"} src={getStarImage("yellow")} />
      </Group>
    </Card>
  );
}
