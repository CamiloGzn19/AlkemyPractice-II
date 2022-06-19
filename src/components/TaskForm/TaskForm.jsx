import { useFormik } from "formik";
import * as Yup from "yup";

import "./TaskForm.styles.css";

export const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    priority: "",
    description: "",
  };

  const onSubmit = () => {
    alert();
  };

  const required = "* Campo obligatorio";

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, "La cantidad mínima de caracteres es 6")
      .required(required),
    status: Yup.string().required(required),
    priority: Yup.string().required(required),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, handleBlur, errors, touched } = formik;

  return (
    <section className="task-form">
      <h2>Crear tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Título"
              className={errors.title ? "error" : ""}
            />
            {errors.title && touched.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>
          <div>
            <select
              name="status"
              className={errors.status ? "error" : ""}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">--Seleccionar un estado--</option>
              <option value="New">Nueva</option>
              <option value="In Process">En proceso</option>
              <option value="Finished">Terminada</option>
            </select>
            {errors.status && touched.status && (
              <span className="error-message">{errors.status}</span>
            )}
          </div>
          <div>
            <select
              name="priority"
              className={errors.priority ? "error" : ""}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">--Seleccionar prioridad--</option>
              <option value="Low">Baja</option>
              <option value="Medium">Meda</option>
              <option value="High">Alta</option>
            </select>
            {errors.priority && touched.priority && (
              <span className="error-message">{errors.priority}</span>
            )}
          </div>
        </div>
        <div>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Descripción"
          />
        </div>
        <button type="submit">Crear</button>
      </form>
    </section>
  );
};
