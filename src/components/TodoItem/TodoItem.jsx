import { useDispatch } from "react-redux";
import "./TodoItem.css";
import { toggleStatus, deleteTodo } from "../../store/todoSlice";

export default function TodoItem({ completed, id, title }) {
    const dispatch = useDispatch();

    return (
        <li className='todo-item'>
            <input
                className='todo-item__checbox'
                type='checkbox'
                checked={completed}
                onChange={() => dispatch(toggleStatus(id))}
            />
            <span
                className={`todo-item__text ${
                    completed ? "todo-item__text_complited" : ""
                }`}>
                {title}
            </span>
            <span
                className='todo-item__remove'
                onClick={() => dispatch(deleteTodo({ todoId: id }))}>
                &#10008;
            </span>
        </li>
    );
}
