import React from "react";
import { useFormik } from "formik";

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

  const validate = (values) => {
    const errors = {};

    if (!values.userName) {
      errors.userName = "El nombre es requerido";
    }
    if (!values.email) {
      errors.email = "El email es requerido";
    }
    if (!values.password) {
      errors.password = "El password es requerido";
    }
    return errors;
  };

  const onSubmit = (e) => {
    alert("Hola");
  };

  const formik = useFormik({ initialValues, validate, onSubmit });

  const { handleSubmit, handleChange, values, errors } = formik;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            name="userName"
            type="text"
            onChange={handleChange}
            value={values.userName}
          />
          {errors.userName && <div>{errors.userName}</div>}
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
          <label>Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && <div>{errors.email}</div>}
        </div>
        <input
          type="hidden"
          name="teamID"
          value="9csdcs9dcsdc dc9sd-c9sdc59sdcsd"
        />
        <div>
          <label>Rol</label>
          <select name="role" onChange={handleChange} value={values.role}>
            <option value="Team Member">Team Member</option>
            <option value="Team Leader">Team Leader</option>
          </select>
          {errors.role && <div>{errors.role}</div>}
        </div>
        <div>
          <label>Continente</label>
          <select
            name="continent"
            onChange={handleChange}
            value={values.continent}
          >
            <option value="America">America</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.continent && <div>{errors.continent}</div>}
        </div>
        <div>
          <label>Región</label>
          <select name="region" onChange={handleChange} value={values.region}>
            <option value="Latam">Latam</option>
            <option value="Brasil">Brasil</option>
            <option value="America del Norte">America del Norte</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.region && <div>{errors.region}</div>}
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};
