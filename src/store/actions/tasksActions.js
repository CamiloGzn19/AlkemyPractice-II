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
  fetch(`${API_URL}/task/${path}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => dispatch(tasksSuccess(data.result)))
    .catch((error) => dispatch(tasksFailure(error)));
};
