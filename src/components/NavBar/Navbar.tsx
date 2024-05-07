import "./style.css";
import { AppShell } from "@mantine/core";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

export default function Navbar() {
  return (
    <AppShell.Navbar className="navbar">
      <Logo />
      <Navigation />
    </AppShell.Navbar>
  );
}
