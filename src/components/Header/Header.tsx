/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppShell, Burger } from "@mantine/core";
import './style.css';
export default function Header({toggle, opened}: any) {

  return (
    <AppShell.Header className="header-burger">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
    </AppShell.Header>
  );
}
