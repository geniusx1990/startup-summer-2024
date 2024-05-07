import { getImgUrl } from "../../utils/getImage";
import { useNavigate } from 'react-router-dom';
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import "./style.css";
import { Container } from "@mantine/core";
export default function NotFoundPage() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  };


  return (
    <Container className="not-found">
      <img
        src={getImgUrl("pagenotfound.svg")}
        alt="page not found"
        width={"656px"}
        height={"195.91px"}
      />
      <p className="not-found__message">
        We can’t find the page you are looking for
      </p>
      <ButtonCustom className={'goHome'} labelName="Go Home" onClick={handleButtonClick}/>
    </Container>
  );
}
