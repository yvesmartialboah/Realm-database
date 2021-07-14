/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */

/*
    Import Realm database Schema
*/
import Realm from "realm";
import { TODO_SCHEMA, TODOLIST_SCHEMA } from "../redux/actionTypes";

/*
    Definition Models and properties
*/

export const TodoSchema = {
    name: TODO_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        done: { type: 'bool', default: false },
    },
};

export const TodoListSchema = {
    name: TODOLIST_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        creationDate: 'date',
        todos: { type: 'list', objectType: TODO_SCHEMA }, // []
    },
};

/*
    Option database
*/

const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoSchema, TodoListSchema],
    schemaVersion: 0 // Optional
};

// function for todoLists
export const InsertNewTodoList = (newTodoList) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let task1;
        realm.write(() => {
            task1 = realm.create(TODOLIST_SCHEMA, newTodoList); // Insertion de tuple
            resolve(newTodoList);
            console.log(`created two tasks: ${task1.name} & ${task1.creationDate} &  ${task1.map((task) => task.name + '' + task.done)}`);
        }).catch((error) => reject(error));
    });
})

