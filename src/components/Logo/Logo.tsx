import "./style.css";
import { getImgUrl } from "../../utils/getImage";
import { Text } from "@mantine/core";

export default function Logo() {
  return (
    <div className="container-logo">
      <img className="logo-image" src={getImgUrl("logo.svg")} alt="" />
      <Text
        fw={600}
        style={{
          fontSize: "24px",
          lineHeight: "36px",
          fontFamily: "Poppins",
          color: "#9854f6",
        }}
        className="logo-title"
      >
        ArrowFlicks
      </Text>
    </div>
  );
}
