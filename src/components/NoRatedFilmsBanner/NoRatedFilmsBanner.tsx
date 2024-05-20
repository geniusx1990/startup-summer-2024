import { Flex, Image, Text } from "@mantine/core";
import { getImgUrl } from "../../utils/getImage";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { useNavigate } from "react-router-dom";
import './style.css';
export default function NoRatedFilmsBanner() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <Flex
      className="empty-state"
      direction="column"
      align="center"
      justify="center"
      style={{ height: "100vh" }}
    >
      <Image w={311.28} height={218.41} src={getImgUrl("no-rated-films.svg")} />
      <Text
      mt={53}
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
    </Flex>
  );
}
