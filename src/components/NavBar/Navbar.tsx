import "./style.css";
import { AppShell, CloseButton } from "@mantine/core";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

interface NavbarProps {
  toggle: () => void;
}

export default function Navbar({ toggle }: NavbarProps) {
  return (
    <AppShell.Navbar className="navbar">
      <div>
        <Logo />
        <Navigation />
      </div>
      <CloseButton
        className="close-button"
        onClick={toggle}
        style={{ position: "absolute", top: "28px", right: "20px" }}
      />
    </AppShell.Navbar>
  );
}
