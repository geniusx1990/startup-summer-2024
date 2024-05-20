import { Flex, Image, Text } from "@mantine/core";
import { getImgUrl } from "../../utils/getImage";

export default function EmptyStateMainPage() {
  return (
    <Flex
      mt={24}
      className="empty-state"
      direction="column"
      align="center"
      justify="center"
    >
      <Image w={311.28} height={218.41} src={getImgUrl("empty-state.svg")} />
      <Text
        mt={16}
        fw={600}
        style={{ fontSize: "20px", fontFamily: "Inter", lineHeight: "24.2px" }}
      >
        We don't have such movies, look for another one
      </Text>
    </Flex>
  );
}
