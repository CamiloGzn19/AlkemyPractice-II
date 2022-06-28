import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { useResize } from "../../../hooks/useResize";
import { Header } from "../../Header/Header";
import { Card } from "../../Card/Card";

import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../../store/actions/tasksActions";
import { deleteTask } from "../../../store/actions/tasksActions";
import { editTaskStatus } from "../../../store/actions/tasksActions";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/Skeleton.css";
import { TaskForm } from "../../TaskForm/TaskForm";
import "./Task.styles.css";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const Task = () => {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [taskFromWho, setTaskFromWho] = useState("ALL");
  const [search, setSearch] = useState("");
  const { isPhone } = useResize();

  const dispatch = useDispatch();

  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    dispatch(getTasks(taskFromWho === "ME" ? "/me" : ""));
  }, [taskFromWho]);

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setRenderList(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (search) {
      setRenderList(list.filter((data) => data.title.startsWith(search)));
    } else {
      setRenderList(list);
    }
  }, [search]);

  if (error) return <div>Hay un error</div>;

  const renderAllCards = () => {
    return renderList?.map((data) => (
      <Card
        key={data._id}
        data={data}
        deleteCard={handleDelete}
        editCardStatus={handleEditCardStatus}
      />
    ));
  };

  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((data) => (
        <Card
          key={data._id}
          data={data}
          deleteCard={handleDelete}
          editCardStatus={handleEditCardStatus}
        />
      ));
  };

  const handleChangeImportance = (e) => {
    if (e.currentTarget.value === "ALL") {
      setRenderList(list);
    } else {
      setRenderList(
        list.filter((data) => data.importance === e.currentTarget.value)
      );
    }
  };

  const handleSearch = debounce((e) => {
    setSearch(e?.target?.value);
  }, 1000);

  const handleDelete = (id) => dispatch(deleteTask(id));

  const handleEditCardStatus = (data) => dispatch(editTaskStatus(data));

  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <div>
              <h2>Mis tareas</h2>
            </div>
            <div className="filters">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => {
                    setTaskFromWho(e.currentTarget.value);
                  }}
                >
                  <FormControlLabel
                    value="All"
                    control={<Radio />}
                    label="Todas"
                  />
                  <FormControlLabel
                    value="ME"
                    control={<Radio />}
                    label="Mis tareas"
                  />
                </RadioGroup>
              </FormControl>
              <div className="search">
                <input
                  type="text"
                  placeholder="Buscar por título..."
                  onChange={handleSearch}
                />
              </div>
              <select name="importance" onChange={handleChangeImportance}>
                <option value="">Seleccionar una prioridad</option>
                <option value="ALL">Todas</option>
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
              </select>
            </div>
          </div>
          {isPhone ? (
            !renderList?.length ? (
              <div> No hay tareas creadas </div>
            ) : loading ? (
              <Skeleton height={90} />
            ) : (
              <div className="list phone">{renderAllCards()}</div>
            )
          ) : (
            <div className="list_group">
              {!renderList?.length ? (
                <div> No hay tareas creadas </div>
              ) : loading ? (
                <Skeleton height={90} />
              ) : (
                <>
                  {" "}
                  <div className="list">
                    <h4>Nuevas</h4>
                    {renderColumnCards("NEW")}
                  </div>
                  <div className="list">
                    <h4>En proceso</h4>
                    {renderColumnCards("IN PROGRESS")}
                  </div>
                  <div className="list">
                    <h4>Finalizadas</h4>
                    {renderColumnCards("FINISHED")}
                  </div>{" "}
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};
