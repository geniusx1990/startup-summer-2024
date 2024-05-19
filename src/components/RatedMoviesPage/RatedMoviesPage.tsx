import { Container, Flex, Text } from "@mantine/core";
import "./style.css";
import { SearchInput } from "../SearchInput/SearchInput";

export default function RatedMoviesPage() {

  return (
    <Container className="container-rated">
      <Flex justify={"space-between"}>
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
    </Container>
  );
}
