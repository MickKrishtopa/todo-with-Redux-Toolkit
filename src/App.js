import "./App.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./store/todoSlice";

import InputForm from "./components/InputForm/InputForm";
import TodoList from "./components/TodoList/TodoList";

function App() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const addTast = () => {
        dispatch(addTodo({ text }));
        setText("");
    };

    return (
        <div className='App'>
            <InputForm
                text={text}
                handleChangeInput={setText}
                handleSubmit={addTast}
            />
            <TodoList />
        </div>
    );
}

export default App;
