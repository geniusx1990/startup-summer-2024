import "./style.css";
import NavigationLink from "../Link/NavigationLink";

export default function Navigation() {
  return (
    <div className="navigation-list">
      <NavigationLink labelName="Movies" />
      <NavigationLink labelName="Rated movies" />
    </div>
  );
}
