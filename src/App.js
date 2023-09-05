import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, fetchTodoList } from "./store/todoSlice";

import InputForm from "./components/InputForm/InputForm";
import TodoList from "./components/TodoList/TodoList";

function App() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const { error, status } = useSelector((state) => state.todoList);

    const addTast = () => {
        dispatch(addNewTodo(text));
        setText("");
    };

    useEffect(() => {
        dispatch(fetchTodoList());
    }, []);

    return (
        <div className='App'>
            <InputForm
                text={text}
                handleChangeInput={setText}
                handleSubmit={addTast}
            />

            {status === "loading" && <h2>Loading...</h2>}
            {error && <h2>An error occured: {error}</h2>}
            <TodoList />
        </div>
    );
}

export default App;
