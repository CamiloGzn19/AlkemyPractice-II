import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "El email es requerido";
    }
    if (!values.password) {
      errors.password = "El password es requerido";
    }
    return errors;
  };

  const onSubmit = (e) => {
    localStorage.setItem("logged", "yes");
    navigate("/", { replace: true });
  };

  const formik = useFormik({ initialValues, validate, onSubmit });

  const { handleSubmit, handleChange, values, errors } = formik;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && <div>{errors.email}</div>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};
