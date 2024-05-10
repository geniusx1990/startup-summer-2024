import { NativeSelect } from "@mantine/core";
import { YearOption } from "../../utils/arrayYears";

interface SelectYearProps {
  years: YearOption[];
  filterValueSelected: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectYear({
  years,
  filterValueSelected,
}: SelectYearProps) {
  function onYearChange(event: React.ChangeEvent<HTMLSelectElement>) {
    filterValueSelected(event);
  }

  const selectGenreOption = {
    value: "",
    label: "Select release year",
  };

  const combinedData = [
    selectGenreOption,
    ...years.map((year) => ({
      value: year.value.toString(),
      label: year.label,
    })),
  ];

  return (
    <NativeSelect
      label="Release year"
      data={combinedData}
      onChange={onYearChange}
    />
  );
}
