import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todoList",
    initialState: {
        todoList: [],
    },
    reducers: {
        addTodo(state, action) {
            state.todoList.push({
                text: action.payload.text,
                id: new Date().toISOString(),
                complited: false,
            });
        },
        removeTodo(state, action) {
            state.todoList = state.todoList.filter(
                (todo) => todo.id !== action.payload.todoId
            );
        },
        toggleTodoStatus(state, action) {
            const changedItem = state.todoList.find(
                (todo) => todo.id === action.payload.todoId
            );
            changedItem.complited = !changedItem.complited;
        },
    },
});

export const { addTodo, removeTodo, toggleTodoStatus } = todoSlice.actions;

export default todoSlice.reducer;
