import "./Header.styles.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("logged");
    navigate("/Login", { replace: true });
  };

  return (
    <header>
      <img src="/img/logo.png" alt="logo" />
      <div onClick={handleLogout}>X</div>
    </header>
  );
};
