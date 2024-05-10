import "./style.css";

import { YearOption } from "../../utils/arrayYears";
import { Genre } from "../../utils/types";
import CustomMultiSelectComponent from "../CustomMultiSelectComponent/CustomMultiSelectComponent";
import CustomSelectComponent from "../CustomSelectComponent/CustomSelectComponent";
import { Button } from "@mantine/core";
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
      <div className="rainting-container">
        <CustomSelectComponent label="Ratings" placeholder="From" />
        <CustomSelectComponent placeholder="To" />
      </div>
      <Button
        size="md"
        variant="transparent"
        className="reset-filter-button"
        data-disabled
        onClick={(event) => event.preventDefault()}
      >
        Reset filters
      </Button>
    </div>
  );
}
