import { API_URL } from "../../Backend/Variables";
import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from "../types";

export const tasksRequest = () => ({
  type: TASKS_REQUEST,
});

export const tasksSuccess = (data) => ({
  type: TASKS_SUCCESS,
  payload: data,
});

export const tasksFailure = (error) => ({
  type: TASKS_FAILURE,
  payload: error,
});

export const getTasks = (path) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`${API_URL}task${path}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => dispatch(tasksSuccess(data.result)))
    .catch((error) => dispatch(tasksFailure(error)));
};

export const deleteTask = (id) => (dispatch) => {
  dispatch(tasksRequest());
  fetch(`${API_URL}task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(tasksFailure(error)));
};

export const editTaskStatus = (data) => (dispatch) => {
  const statusArray = ["NEW", "IN PROGRESS", "FINISHED"];
  const newStatusIndex =
    statusArray.indexOf(data.status) > 1
      ? 0
      : statusArray.indexOf(data.status) + 1;

  dispatch(tasksRequest());
  fetch(`${API_URL}task/${data._id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      task: {
        title: data.title,
        importance: data.importance,
        status: statusArray[newStatusIndex],
        description: data.description,
      },
    }),
  })
    .then((response) => response.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(tasksFailure(error)));
};
