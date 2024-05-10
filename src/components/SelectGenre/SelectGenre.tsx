/* eslint-disable @typescript-eslint/no-explicit-any */
import { NativeSelect } from "@mantine/core";
import { Genre } from "../../utils/types";

interface SelectGenreProps {
  genres: Genre[];
  filterValueSelected: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectGenre({
  genres,
  filterValueSelected,
}: SelectGenreProps) {
  function onGenreChange(event: React.ChangeEvent<HTMLSelectElement>) {
    filterValueSelected(event);
  }

  const selectGenreOption = {
    value: "",
    label: "Select genre",
  };

  const combinedData = [
    selectGenreOption,
    ...genres.map((genre) => ({
      value: genre.id.toString(),
      label: genre.name,
    })),
  ];

  return (
    <NativeSelect
      label="Genres"
      data={combinedData}
      onChange={onGenreChange}
    />
  );
}
