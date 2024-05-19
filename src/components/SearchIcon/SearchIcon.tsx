import { Image } from "@mantine/core";
import { getImgUrl } from "../../utils/getImage";

export function SearchIcon() {
  return <Image src={getImgUrl("searchIcon.svg")} />;
}
