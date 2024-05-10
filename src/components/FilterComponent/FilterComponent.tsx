import { useState } from "react";
import { YearOption } from "../../utils/arrayYears";
import { FilterOptions, Genre } from "../../utils/types";
import SelectGenre from "../SelectGenre/SelectGenre";
import SelectYear from "../SelectYear/SelectYear";

interface FilterComponentProps {
  genres: Genre[];
  years: YearOption[];
  onFilterChanged: (options: FilterOptions) => void;
}

export default function FilterComponent({
  genres,
  years,
  onFilterChanged,
}: FilterComponentProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = event.target.value;
    setSelectedGenre(genre);

    onFilterChanged({ genre, year: selectedYear });
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setSelectedYear(year);

    onFilterChanged({ genre: selectedGenre, year });
  };

  return (
    <>
      <SelectGenre genres={genres} filterValueSelected={handleGenreChange} />
      <SelectYear years={years} filterValueSelected={handleYearChange} />
    </>
  );
}
