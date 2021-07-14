/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { combineReducers } from "redux";

import { todoList } from "./todoList";
import { todo } from "./todo";

export default combineReducers({
    todoList,
    todo,
});
