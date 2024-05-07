import "./style.css";
import { NavLink } from "@mantine/core";
type NavigationLinkProps = {
  labelName: string;
};

export default function NavigationLink({ labelName }: NavigationLinkProps) {
  return (
    <NavLink
      className="link-name"
      href="#required-for-focus"
      label={labelName}
    />
  );
}
