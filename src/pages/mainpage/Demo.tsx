import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "./style.css";
import Logo from "../../components/Logo/Logo";
import Navigation from "../../components/Navigation/Navigation";

export default function Demo() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell>
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>

      <AppShell.Navbar className="navbar">
        <Logo/>
        <Navigation />
      </AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
