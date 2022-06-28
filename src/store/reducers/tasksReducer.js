import {
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASKS_FAILURE,
  TASKS_CREATED,
} from "../types";

const initialState = {
  loading: false,
  tasks: [],
  error: "",
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TASKS_SUCCESS:
      return {
        loading: false,
        error: "",
        tasks: action.payload,
      };
    case TASKS_FAILURE:
      return {
        loading: false,
        error: action.payload,
        tasks: [],
      };
    case TASKS_CREATED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
