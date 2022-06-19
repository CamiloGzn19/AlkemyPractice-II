import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import "../Auth.styles.css";

export const Registro = () => {
  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
  };

  const required = "* Campo obligatorio";

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "La cantidad de caracteres es 4")
      .required(required),
    password: Yup.string()
      .min(6, "La cantidad de caracteres es 6")
      .required(required),
    email: Yup.string().email("Debe ser un email válido").required(required),
    teamID: Yup.string("").required(required),
    role: Yup.string("").required(required),
    continent: Yup.string("").required(required),
    region: Yup.string("").required(required),
  });

  const onSubmit = (e) => {
    alert("Hola");
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            name="userName"
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.userName}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && (
            <span className="error-message">{errors.userName}</span>
          )}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            className={errors.email && touched.email ? "error" : ""}
          />
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <input
          type="hidden"
          name="teamID"
          value="9csdcs9dcsdc dc9sd-c9sdc59sdcsd"
        />
        <div>
          <label>Rol</label>
          <select
            name="role"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.role}
            className={errors.role && touched.role ? "error" : ""}
          >
            <option value="">-- Selecciona --</option>
            <option value="Team Member">Team Member</option>
            <option value="Team Leader">Team Leader</option>
          </select>
          {errors.role && touched.role && (
            <span className="error-message">{errors.role}</span>
          )}
        </div>
        <div>
          <label>Continente</label>
          <select
            name="continent"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.continent}
            className={errors.continent && touched.continent ? "error" : ""}
          >
            <option value="">-- Selecciona --</option>
            <option value="America">America</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.continent && touched.continent && (
            <span className="error-message">{errors.continent}</span>
          )}
        </div>
        <div>
          <label>Región</label>
          <select
            name="region"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.region}
            className={errors.region && touched.region ? "error" : ""}
          >
            <option value="">-- Selecciona --</option>
            <option value="Latam">Latam</option>
            <option value="Brasil">Brasil</option>
            <option value="America del Norte">America del Norte</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.region && touched.region && (
            <span className="error-message">{errors.region}</span>
          )}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
        <div>
          <Link to="/login">Ir a Iniciar sesión</Link>
        </div>
      </form>
    </div>
  );
};
