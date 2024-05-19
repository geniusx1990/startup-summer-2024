import { Button, Input } from "@mantine/core";
import { SearchIcon } from "../SearchIcon/SearchIcon";
import "./style.css";

export function SearchInput() {
  return (
    <Input
      classNames={{
        wrapper: "input-wrapper",
        input: "input-input",
      }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
      w={490}
      h={48}
      radius={8}
      placeholder="Search movie title"
      leftSection={<SearchIcon />}
      rightSection={
        <Button
          variant="filled"
          color="#9854F6"
          mr={4}
          h={32}
          w={88}
          radius={8}
          onClick={() => console.log("Search button clicked")}
        >
          Search
        </Button>
      }
      rightSectionWidth={88}
    />
  );
}
