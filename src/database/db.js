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

/*
    Add TodoLists
*/
export const insertNewTodoList = (newTodoList) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let task1;
        realm.write(() => {
            task1 = realm.create(TODOLIST_SCHEMA, newTodoList); // Insertion de tuple
            resolve(newTodoList);
        });
        console.log(`created two tasks: ${task1.name} & ${task1.creationDate} &  ${task1.map((task) => task.name + '' + task.done)}`);
    }).catch((error) => reject(error));
})

/*
    Update TodoLists
*/
export const updateTodoList = (todoList) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoList.id); // Récupération de la data sélectionnée
            updatingTodoList.name = todoList.name;
            // updatingTodoList.creationDate = todoList.creationDate;
            // updatingTodoList.todos = todoList.todos;
            resolve();
        });
    }).catch((error) => reject(error));
})

/*
    Delete TodoList
*/
export const deleteTodoList = (todoListId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId); // Suppression de la data sélectionnée
            Realm.delete(deletingTodoList);
            resolve();
        });
    }).catch((error) => reject(error));
})


/*
    Delete All TodoList
*/
export const deleteAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            const allTodoLists = realm.objects(TODOLIST_SCHEMA);
            Realm.delete(allTodoLists);
            resolve();
        });
    }).catch((error) => reject(error));
})



// Export Schema
export default new Realm(databaseOptions);