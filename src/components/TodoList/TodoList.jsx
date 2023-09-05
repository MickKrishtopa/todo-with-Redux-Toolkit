import "./TodoList.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import TodoItem from "../TodoItem/TodoItem";

export default function TodoList() {
    const todoList = useSelector((state) => state.todoList.todoList);
    return (
        <ul className='todo-list'>
            {todoList?.length > 0 ? (
                todoList.map((todo) => <TodoItem key={todo.id} {...todo} />)
            ) : (
                <h2>Nothing to do</h2>
            )}
        </ul>
    );
}
