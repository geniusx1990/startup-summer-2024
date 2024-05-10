import { Genre } from "../../utils/types";
import SelectGenre from "../SelectGenre/SelectGenre";

export default function FilterComponent({
  genres,
  filterValueSelected,
}: {
  genres: Genre[];
  filterValueSelected: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <>
      <SelectGenre genres={genres} filterValueSelected={filterValueSelected} />
    </>
  );
}
