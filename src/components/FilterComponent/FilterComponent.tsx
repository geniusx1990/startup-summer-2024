import "./style.css";

import { YearOption } from "../../utils/arrayYears";
import { Genre, UserInputFilter } from "../../utils/types";
import CustomMultiSelectComponent from "../CustomMultiSelectComponent/CustomMultiSelectComponent";
import CustomSelectComponent from "../CustomSelectComponent/CustomSelectComponent";
import { Button } from "@mantine/core";
import { useState } from "react";
interface FilterComponentProps {
  genres: Genre[];
  years: YearOption[];
  onUpdateFilter: (newFilterData: UserInputFilter) => void;
}

export default function FilterComponent({
  genres,
  years,
  onUpdateFilter,
}: FilterComponentProps) {
  const [filterData, setFilterData] = useState<UserInputFilter>({
    selectedGenres: [],
    selectedYears: [],
    ratingFrom: null,
    ratingTo: null,
  });


  function handleChange(
    inputIdentifier: keyof UserInputFilter,
    newValue:
      | string[]
      | UserInputFilter["ratingFrom"]
      | UserInputFilter["ratingTo"]
      | null
  ) {
    const newFilter = {
      ...filterData,
      [inputIdentifier]: newValue,
    };
    setFilterData(newFilter);
    onUpdateFilter(newFilter);
  }

  console.log(filterData);
  return (
    <div className="filter-container">
      <CustomMultiSelectComponent
        list={genres}
        placeholder="Select genre"
        label="Genres"
        onChange={(newValue) => handleChange("selectedGenres", newValue)}
      />
      <CustomMultiSelectComponent
        list={years}
        placeholder="Select release year"
        label="Release year"
        onChange={(newValue) => handleChange("selectedYears", newValue)}
      />
      <div className="rainting-container">
        <CustomSelectComponent
          label="Ratings"
          placeholder="From"
          onChange={(newValue) => handleChange("ratingFrom", newValue)}
        />
        <CustomSelectComponent
          placeholder="To"
          onChange={(newValue) => handleChange("ratingTo", newValue)}
        />
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
