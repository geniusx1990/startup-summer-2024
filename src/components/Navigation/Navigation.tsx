import { Box } from "@mantine/core";
import NavigationLink from "../Link/NavigationLink";

export default function Navigation() {
  const data = [
    {
      label: "Movies",
      route: "movies",
    },
    {
      label: "Security",
      route: "ratedmovies",
    },
  ];

  const items = data.map((item) => (
    <NavigationLink
      key={item.label}
      labelName={item.label}
      route={item.route}
    />
  ));

  return <Box pt={80}>{items}</Box>;
}
