import { Text } from "@mantine/core";

interface PageHeaderTitleProps {
  textTitle: string;
}

export default function PageHeaderTitle({ textTitle }: PageHeaderTitleProps) {
  return (
    <Text
      fw={700}
      style={{ fontFamily: "Inter", fontSize: 32, lineHeight: "44.8px" }}
    >
      {textTitle}
    </Text>
  );
}
