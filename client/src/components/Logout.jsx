import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleLogout}>
      <BiPowerOff />
    </Button>
  );
};

const Button = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  justify-content: center;
  background-color: #38598b;
  border-radius: 0.2rem;
  cursor: pointer;
  border: none;
  svg {
    font-size: 1rem;
  }
`;

export default Logout;
