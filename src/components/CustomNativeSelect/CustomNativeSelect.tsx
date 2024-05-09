import { NativeSelect } from "@mantine/core";
import { Genre } from "../../utils/types";

export default function CustomNativeSelect({ genres }: { genres: Genre[] }) {
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

  return <NativeSelect label="Genres" data={combinedData} />;
}
