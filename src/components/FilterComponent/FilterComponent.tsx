import "./style.css";

import { YearOption } from "../../utils/arrayYears";
import { Genre } from "../../utils/types";
import CustomMultiSelectComponent from "../CustomMultiSelectComponent/CustomMultiSelectComponent";
interface FilterComponentProps {
  genres: Genre[];
  years: YearOption[];
  onGenreChange: (selectedGenres: string[]) => void;
  onYearChange: (selectedYears: string[]) => void;
}

export default function FilterComponent({
  genres,
  years,
  onGenreChange,
  onYearChange,
}: FilterComponentProps) {
  return (
    <div className="filter-container">
      <CustomMultiSelectComponent
        list={genres}
        placeholder="Select genre"
        label="Genres"
        onChange={onGenreChange}
      />
      <CustomMultiSelectComponent
        list={years}
        placeholder="Select release year"
        label="Release year"
        onChange={onYearChange}
      />
    </div>
  );
}
