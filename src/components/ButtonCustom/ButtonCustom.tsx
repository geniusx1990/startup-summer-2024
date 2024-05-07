import { Button } from "@mantine/core";
import "./style.css";

type ButtonProps = {
  className: string;
  labelName: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function ButtonCustom({
  labelName,
  className,
  onClick,
}: ButtonProps) {
  return (
    <Button
      mt={"16px"}
      className={className}
      variant="filled"
      color="#9854F6"
      radius={"8px"}
      p="10px 20px"
      onClick={onClick}
    >
      {labelName}
    </Button>
  );
}
