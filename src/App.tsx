import "@mantine/core/styles.css";
import "./App.css";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RouterSwitcher from "./components/RouterSwitcher/RouterSwitcher";
import Navbar from "./components/NavBar/Navbar";
import Header from "./components/Header/Header";

export default function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <Header toggle={toggle} opened={opened} />
      <Navbar />

      <AppShell.Main>
        <RouterSwitcher />
      </AppShell.Main>
    </AppShell>
  );
}
