import "./style.css";
import { NavLink } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

type NavigationLinkProps = {
  labelName: string;
  route: string;
};

export default function NavigationLink({
  labelName,
  route,
}: NavigationLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === `/${route}`;

  function stylesForNavlink(isActive: boolean) {
    if (isActive) return 700;
  }

  return (
    <NavLink
      className="link-name"
      onClick={() => navigate(`/${route}`)}
      label={labelName}
      active={isActive}
      color="#9854F6"
      fw={stylesForNavlink(isActive)}
    />
  );
}
