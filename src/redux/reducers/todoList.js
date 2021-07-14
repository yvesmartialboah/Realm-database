/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import {ADD_TODOLIST} from "../actionTypes";

const defaultState = [];

export const todoList = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TODOLIST:
      // payload = [{}]
      return action.payload
    default:
      return state;
  }
};
