import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import Demo from "./pages/mainpage/Demo";

export default function App() {
  return <MantineProvider><Demo/></MantineProvider>;
}
