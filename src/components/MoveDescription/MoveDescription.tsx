import { Card, Divider, Flex, Group, Text } from "@mantine/core";
import { MovieDetails, ProductionCompany, Video } from "../../utils/types";
import { useEffect, useState } from "react";
import { LoaderComponent } from "../LoaderComponent/LoaderComponent";
import { proxyURL, routes } from "../../utils/api";
import "./style.css";
import { getEmptyCompanyLogo } from "../../utils/getEmptyCompanyLogo";
export default function MoveDescription({
  movieDetails,
}: {
  movieDetails: MovieDetails | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [videoArray, setVideoArray] = useState<Video[]>([]);
  const videoURL = `${proxyURL}${routes.movie}?movie_id=${movieDetails?.id}/videos`;

  useEffect(() => {
    setIsLoading(true);
    fetch(videoURL)
      .then((response) => response.json())
      .then((data) => {
        setVideoArray(data.results as Video[]);
        setIsLoading(false);
      });
  }, []);

  function createLinkForTrailer(arr: Video[]) {
    const trailer = arr.find((item) => item.type === "Trailer");
    const clip = arr.find((item) => item.type === "Clip");

    const video = trailer || clip;

    return video ? `https://www.youtube.com/embed/${video.key}` : "";
  }

  if (!movieDetails) {
    return null;
  }

  function companies(arr: ProductionCompany[]) {
    return (
      <Flex mt={16} direction={"column"} gap={12}>
        {arr.map((item) => (
          <Group key={item.id}>
            <div className="ellipse">
              {item.logo_path ? (
                <img
                  className="company-logo"
                  src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                  alt={item.name}
                  border-radius={"50%"}
                />
              ) : (
                <img
                  src={getEmptyCompanyLogo("grey")}
                  width={"20px"}
                  height={"20px"}
                />
              )}
            </div>
            <Text
              ff={"Inter"}
              fw={700}
              style={{
                fontSize: "16px",
                lineHeight: "22.4px",
              }}
            >
              {item.name}
            </Text>
          </Group>
        ))}
      </Flex>
    );
  }
  return (
    <Card mt={20} p={24} radius={12}>
      <Flex direction={"column"}>
        <Text
          fw={700}
          style={{
            fontSize: "20px",
            lineHeight: "20px",
          }}
        >
          Trailer
        </Text>

        {isLoading ? (
          <LoaderComponent />
        ) : (
          <Flex direction={"column"} gap={20}>
            <iframe
              className="video"
              width="500"
              height="281"
              src={createLinkForTrailer(videoArray)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            <Divider />
            <div>
              <Text
                fw={700}
                style={{
                  fontSize: "20px",
                  lineHeight: "20px",
                }}
              >
                Description
              </Text>
              <Text
                fw={400}
                mt={16}
                style={{
                  fontSize: "16px",
                  lineHeight: "22.4px",
                }}
              >
                {movieDetails.overview}
              </Text>
            </div>
            <Divider />
            <div>
              <Text
                fw={700}
                style={{
                  fontSize: "20px",
                  lineHeight: "20px",
                }}
              >
                Production
              </Text>
              {companies(movieDetails.production_companies)}
            </div>
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
