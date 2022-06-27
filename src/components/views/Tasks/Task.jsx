import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/Skeleton.css";

import { API_URL } from "../../../Backend/Variables";
import { useResize } from "../../../hooks/useResize";
import { Header } from "../../Header/Header";
import { Card } from "../../Card/Card";
import "./Task.styles.css";
import { TaskForm } from "../../TaskForm/TaskForm";
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
  const [loading, setLoading] = useState(false);
  const { isPhone } = useResize();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}task${taskFromWho === "ME" ? "/me" : ""}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setList(data.result);
        setRenderList(data.result);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  }, [taskFromWho]);

  const limitString = (str) => {
    if (str.length > 135)
      return { string: str.slice(0, 135).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };

  const renderAllCards = () => {
    return renderList?.map((data) => <Card key={data._id} data={data} />);
  };

  const renderNewCards = () => {
    return renderList
      ?.filter((data) => data.status === "NEW")
      .map((data) => <Card key={data._id} data={data} />);
  };

  const renderInProgressCards = () => {
    return renderList
      ?.filter((data) => data.status === "IN PROGRESS")
      .map((data) => <Card key={data._id} data={data} />);
  };

  const renderFinishedCards = () => {
    return renderList
      ?.filter((data) => data.status === "FINISHED")
      .map((data) => <Card key={data._id} data={data} />);
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
                    {renderNewCards()}
                  </div>
                  <div className="list">
                    <h4>En proceso</h4>
                    {renderInProgressCards()}
                  </div>
                  <div className="list">
                    <h4>Finalizadas</h4>
                    {renderFinishedCards()}
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
