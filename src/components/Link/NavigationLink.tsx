import "./style.css";
import { NavLink } from "@mantine/core";
import { useNavigate } from "react-router-dom";

type NavigationLinkProps = {
  labelName: string;
  route: string;
};

export default function NavigationLink({
  labelName,
  route,
}: NavigationLinkProps) {
  const navigate = useNavigate();
  return (
    <NavLink
      className="link-name"
      onClick={() => navigate(`/${route}`)}
      label={labelName}
    />
  );
}
