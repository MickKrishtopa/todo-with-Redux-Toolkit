import { useDispatch } from "react-redux";
import "./TodoItem.css";
import { toggleTodoStatus, removeTodo } from "../../store/todoSlice";

export default function TodoItem({ complited, id, text }) {
    const dispatch = useDispatch();

    return (
        <li className='todo-item'>
            <input
                className='todo-item__checbox'
                type='checkbox'
                checked={complited}
                onChange={() => dispatch(toggleTodoStatus({ todoId: id }))}
            />
            <span
                className={`todo-item__text ${
                    complited ? "todo-item__text_complited" : ""
                }`}>
                {text}
            </span>
            <span
                className='todo-item__remove'
                onClick={() => dispatch(removeTodo({ todoId: id }))}>
                &#10008;
            </span>
        </li>
    );
}
