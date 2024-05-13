import "./style.css";

import { ratingValues, sortByValues, yearsValues } from "../../utils/constants";
import { Genre, UserInputFilter } from "../../utils/types";
import CustomMultiSelectComponent from "../CustomMultiSelectComponent/CustomMultiSelectComponent";
import CustomSelectComponent from "../CustomSelectComponent/CustomSelectComponent";
import { Button } from "@mantine/core";
import { useState } from "react";
interface FilterComponentProps {
  genres: Genre[];
  onUpdateFilter: (newFilterData: UserInputFilter) => void;
}

export default function FilterComponent({
  genres,
  onUpdateFilter,
}: FilterComponentProps) {
  const [filterData, setFilterData] = useState<UserInputFilter>({
    selectedGenres: [],
    selectedYears: null,
    ratingFrom: null,
    ratingTo: null,
    sortBy: null,
  });

  function handleChange(
    inputIdentifier: keyof UserInputFilter,
    newValue:
      | string[]
      | UserInputFilter["ratingFrom"]
      | UserInputFilter["ratingTo"]
      | UserInputFilter["sortBy"]
      | null
  ) {
    const newFilter = {
      ...filterData,
      [inputIdentifier]: newValue,
    };
    setFilterData(newFilter);
    onUpdateFilter(newFilter);
  }

  return (
    <>
      <div className="filter-container">
        <CustomMultiSelectComponent
          list={genres}
          placeholder="Select genre"
          label="Genres"
          onChange={(newValue) => handleChange("selectedGenres", newValue)}
        />
        <CustomSelectComponent
          arrayInput={yearsValues}
          label="Select release year"
          placeholder="Release year"
          onChange={(newValue) => handleChange("selectedYears", newValue)}
        />
        <div className="rainting-container">
          <CustomSelectComponent
            arrayInput={ratingValues}
            label="Ratings"
            placeholder="From"
            onChange={(newValue) => handleChange("ratingFrom", newValue)}
          />
          <CustomSelectComponent
            arrayInput={ratingValues}
            placeholder="To"
            onChange={(newValue) => handleChange("ratingTo", newValue)}
          />
        </div>
        <Button
          size="md"
          variant="transparent"
          className="reset-filter-button"
          disabled={
            !(
              filterData.selectedGenres.length ||
              filterData.selectedYears ||
              filterData.ratingFrom ||
              filterData.ratingTo ||
              filterData.sortBy
            )
          }
          onClick={() => {
            setFilterData({
              selectedGenres: [],
              selectedYears: null,
              ratingFrom: null,
              ratingTo: null,
              sortBy: null,
            });
            onUpdateFilter({
              selectedGenres: [],
              selectedYears: null,
              ratingFrom: null,
              ratingTo: null,
              sortBy: null,
            });
          }}
        >
          Reset filters
        </Button>
      </div>
      <div className="sort-container">
        <CustomSelectComponent
          label="Sort by"
          arrayInput={sortByValues}
          defaultValue={{ label: "Most Popular", value: "popularity.desc" }}
          onChange={(newValue) => handleChange("sortBy", newValue)}
        />
      </div>
    </>
  );
}
