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
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <Header toggle={toggle} opened={opened} />
      <Navbar />

      <AppShell.Main className="main-content">
        <RouterSwitcher />
      </AppShell.Main>
    </AppShell>
  );
}
