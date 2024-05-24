import "./style.css";

import { ratingValues, sortByValues, yearsValues } from "../../utils/constants";
import { Genre, OptionInterface, UserInputFilter } from "../../utils/types";
import { IconChevronDown } from "@tabler/icons-react";
import CustomMultiSelectComponent from "../CustomMultiSelectComponent/CustomMultiSelectComponent";
import CustomSelectComponent from "../CustomSelectComponent/CustomSelectComponent";
import { Button, Grid } from "@mantine/core";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface FilterComponentProps {
  genres: Genre[];
  onUpdateFilter: (newFilterData: UserInputFilter) => void;
}

export default function FilterComponent({
  genres,
  onUpdateFilter,
}: FilterComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const selectedGenres = params.get("with_genres")?.split(",") || [];
  const selectedYears = params.get("primary_release_year")
    ? { label: params.get("primary_release_year") as string, value: params.get("primary_release_year") as string }
    : null;
  const ratingFrom = params.get("vote_average.gte")
    ? { label: params.get("vote_average.gte") as string, value: params.get("vote_average.gte") as string }
    : null;
  const ratingTo = params.get("vote_average.lte")
    ? { label: params.get("vote_average.lte") as string, value: params.get("vote_average.lte") as string }
    : null;
  const sortBy = params.get("sort_by")
    ? { label: sortByValues.find(option => option.value === params.get("sort_by"))?.label || "Sort By", value: params.get("sort_by") as string }
    : { label: "Most Popular", value: "popularity.desc" };


  const [filterData, setFilterData] = useState<UserInputFilter>({
    selectedGenres: selectedGenres,
    selectedYears: selectedYears,
    ratingFrom: ratingFrom,
    ratingTo: ratingTo,
    sortBy: sortBy,
  });

  function handleChange(
    inputIdentifier: keyof UserInputFilter,
    newValue:
      | string[]
      | OptionInterface
      | null
  ) {
    const newFilter = {
      ...filterData,
      [inputIdentifier]: newValue,
    };
    setFilterData(newFilter);
    onUpdateFilter(newFilter);
    updateURLParameters(newFilter);
  }



  function updateURLParameters(newFilter: UserInputFilter) {
    const params = new URLSearchParams();
    if (newFilter.selectedGenres.length) {
      params.set("with_genres", newFilter.selectedGenres.join(","));
    }
    if (newFilter.selectedYears) {
      params.set("primary_release_year", newFilter.selectedYears.value);
    }
    if (newFilter.ratingFrom) {
      params.set("vote_average.gte", newFilter.ratingFrom.value);
    }
    if (newFilter.ratingTo) {
      params.set("vote_average.lte", newFilter.ratingTo.value);
    }
    if (newFilter.sortBy) {
      params.set("sort_by", newFilter.sortBy.value);
    }
    navigate(`?${params.toString()}`);
  }

  const handleButtonClick = () => {
    const defaultFilterData = {
      selectedGenres: [],
      selectedYears: null,
      ratingFrom: null,
      ratingTo: null,
      sortBy: { label: "Most Popular", value: "popularity.desc" },
    };
    setFilterData(defaultFilterData);
    onUpdateFilter(defaultFilterData);
    navigate('');
  };

  const isDisabled =
    filterData.selectedGenres.length ||
    filterData.selectedYears ||
    filterData.ratingFrom ||
    filterData.ratingTo ||
    filterData.sortBy;

  return (
    <>
      <Grid gutter={16} my={{ base: 5, xs: 15, md: 24 }} mt={40}>
        <Grid.Col span={{ lg: 3.6, xs: 6, base: 12 }}>
          <CustomMultiSelectComponent
            list={genres}
            placeholder="Select genre"
            label="Genres"
            value={filterData.selectedGenres}
            rightSection={
              <IconChevronDown
                style={{ width: 24, height: 24, color: "#ACADB9" }}
              />
            }
            onChange={(newValue) => handleChange("selectedGenres", newValue)}
          />
        </Grid.Col>
        <Grid.Col span={{ lg: 3.6, xs: 6, base: 12 }}>
          <CustomSelectComponent
            test={filterData.selectedYears}
            rightSection={
              <IconChevronDown
                style={{ width: 24, height: 24, color: "#ACADB9" }}
              />
            }
            arrayInput={yearsValues}
            label="Release year"
            placeholder="Release year"
            onChange={(newValue) => handleChange("selectedYears", newValue)}
          />
        </Grid.Col>
        <Grid.Col span={{ lg: 3.6, xs: 6, base: 12 }}>
          <div className="rainting-container">
            <CustomSelectComponent
              test={filterData.ratingFrom}
              arrayInput={ratingValues}
              label="Ratings"
              placeholder="From"
              onChange={(newValue) => handleChange("ratingFrom", newValue)}
            />

            <CustomSelectComponent
              test={filterData.ratingTo}
              arrayInput={ratingValues}
              placeholder="To"
              onChange={(newValue) => handleChange("ratingTo", newValue)}
            />
          </div>
        </Grid.Col>

        <Grid.Col
          span={{ lg: 1, xs: 6, base: 12 }}
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <div className="test">
            <Button
              color="#9854F6"
              w="fit-content"
              variant="transparent"
              style={{ padding: 0, margin: 0 }}
              disabled={!isDisabled}
              onClick={handleButtonClick}
            >
              Reset filters
            </Button>
          </div>
        </Grid.Col>
      </Grid>
      <div className="sort-container">
        <CustomSelectComponent
          test={filterData.sortBy}
          rightSection={<IconChevronDown />}
          label="Sort by"
          arrayInput={sortByValues}
          defaultValue={filterData.sortBy}
          onChange={(newValue) => handleChange("sortBy", newValue)}
        />
      </div>
    </>
  );
}
