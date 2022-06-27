import "./Header.styles.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/Login", { replace: true });
  };

  return (
    <header>
      <img src="/img/logo.png" alt="logo" />
      <div className="wrapper_right_header">
        <div>{localStorage.getItem("userName")}</div>
        <div onClick={handleLogout}>X</div>
      </div>
    </header>
  );
};
