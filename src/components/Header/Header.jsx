import "./Header.styles.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/Login", { replace: true });
  };

  return (
    <header>
      <img src="/img/logo.png" alt="logo" />
      <div className="wrapper_right_header">
        <div className="black">Tareas creadas: {tasks.length}</div>
        <div className="black">{localStorage.getItem("userName")}</div>
        <div onClick={handleLogout}>X</div>
      </div>
    </header>
  );
};
