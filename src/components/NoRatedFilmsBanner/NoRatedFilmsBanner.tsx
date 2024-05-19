import { Container, Image, Text } from "@mantine/core";
import { getImgUrl } from "../../utils/getImage";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { useNavigate } from "react-router-dom";

export default function NoRatedFilmsBanner() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <Image w={311.28} height={218.41} src={getImgUrl("no-rated-films.svg")} />
      <Text
        fw={600}
        style={{ fontSize: "20px", fontFamily: "Inter", lineHeight: "24.2px" }}
      >
        You haven't rated any films yet
      </Text>
      <ButtonCustom
        className="no-films"
        labelName="Find movies"
        onClick={handleButtonClick}
      />
    </Container>
  );
}
