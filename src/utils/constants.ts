import { OptionInterface } from "./types";
export const startYear = 1900;
export const endYear = new Date().getFullYear();

export const yearsValues: OptionInterface[] = [];
for (let year = startYear; year <= endYear; year++) {
  yearsValues.push({ label: year.toString(), value: year.toString() });
}

export const ratingValues: OptionInterface[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
];

export const sortByValues: OptionInterface[] = [
  { label: "Most Popular", value: "popularity.desc" },
  { label: "Least Popular", value: "popularity.asc" },
  { label: "Most rated", value: "vote_average.desc" },
  { label: "Least Rated", value: "vote_average.asc" },
  { label: "Most Voted", value: "vote_count.desc" },
  { label: "Least Voted", value: "vote_count.asc" },
  { label: "Original Title desc", value: "original_title.desc" },
  { label: "Original Title asc", value: "original_title.asc" },
  { label: "Revenue (Low to High)", value: "revenue.desc" },
  { label: "Revenue (High to Low)", value: "revenue.asc" },
  { label: "Release Date DESC", value: "primary_release_date.desc" },
  { label: "Release Date ASC", value: "primary_release_date.asc" },
  { label: "Title ASC", value: "title.asc" },
  { label: "Title DESC", value: "title.desc" },
];
