import { Genre } from "../../utils/types";
import CustomNativeSelect from "../CustomNativeSelect/CustomNativeSelect";

export default function FilterComponent({ genres }: { genres: Genre[] }) {
  return <CustomNativeSelect genres={genres}/>;
}
