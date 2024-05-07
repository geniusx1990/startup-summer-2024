import "./style.css";
import NavigationLink from "../Link/NavigationLink";

export default function Navigation() {
  return (
    <div className="navigation-list">
      <NavigationLink labelName="Movies" route="movies" />
      <NavigationLink labelName="Rated movies" route="ratedmovies" />
    </div>
  );
}
