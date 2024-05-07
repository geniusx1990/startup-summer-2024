import "./style.css";
import { getImgUrl } from "../../utils/getImage";
export default function Logo() {
  return (
    <div className="container-logo">
    <img className="logo-image" src={getImgUrl('logo.svg')} alt="" />
      <div className="logo-title">ArrowFlicks</div>
    </div>
  );
}
