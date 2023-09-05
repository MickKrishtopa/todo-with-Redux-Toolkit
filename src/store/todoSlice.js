import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodoList = createAsyncThunk(
    "todoList/fetchTodos",
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/todos?_limit=15"
            );
            if (!response.ok) {
                throw new Error("Server error");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    "todoList/deleteTodo",
    async function (todoId, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/todos/${todoId}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Can't delete task. Server error.");
            }
            dispatch(removeTodo(todoId));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const addNewTodo = createAsyncThunk(
    "todoList/addNewTodo",
    async function (text, { rejectWithValue, dispatch }) {
        try {
            const todo = {
                title: text,
                userId: 1,
                completed: false,
            };

            const response = await fetch(
                `https://jsonplaceholder.typicode.com/todos`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify(todo),
                }
            );

            if (!response.ok) {
                throw new Error("Can't create task. Server error.");
            }
            const data = await response.json();
            console.log(data);
            dispatch(addTodo(data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const toggleStatus = createAsyncThunk(
    "todoList/toggleTodoStatus",
    async function (todoId, { rejectWithValue, dispatch, getState }) {
        const todo = getState().todoList.todoList.find(
            (todo) => todo.id === todoId
        );
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/todos/${todoId}`,
                {
                    method: "PATCH",
                    header: {
                        "Content-Type": "plication/json",
                    },
                    body: JSON.stringify({
                        completed: !todo.completed,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Can't toggle task status. Server error.");
            }

            dispatch(toggleTodoStatus({ todoId }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
};

const todoSlice = createSlice({
    name: "todoList",
    initialState: {
        todoList: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todoList.push(action.payload);
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
            changedItem.completed = !changedItem.completed;
        },
    },
    extraReducers: {
        [fetchTodoList.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [fetchTodoList.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.todoList = action.payload.map((todo) => ({
                ...todo,
                text: todo.title,
            }));
        },
        [fetchTodoList.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [toggleStatus.rejected]: setError,
    },
});

const { addTodo, removeTodo, toggleTodoStatus } = todoSlice.actions;

export default todoSlice.reducer;
