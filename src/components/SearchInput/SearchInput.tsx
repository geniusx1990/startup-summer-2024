import { Button, Group, Input } from "@mantine/core";
import { SearchIcon } from "../SearchIcon/SearchIcon";
import "./style.css";
import { useState } from "react";

export function SearchInput({
  onSearchTextChange,
}: {
  onSearchTextChange: (text: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <Group
      className="input-wrapper"
      style={{ width: 490, alignItems: "center" }}
    >
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        classNames={{
          input: "input-input",
        }}
        style={{
          flexGrow: 1,
        }}
        radius={8}
        placeholder="Search movie title"
        leftSection={<SearchIcon />}
      />
      <Button
        variant="filled"
        color="#9854F6"
        h={48}
        radius={8}
        onClick={() => onSearchTextChange(value)}
      >
        Search
      </Button>
    </Group>
  );
}
