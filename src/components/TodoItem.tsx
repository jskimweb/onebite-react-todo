import "./TodoItem.css";
import { memo, useContext } from "react";
import { TodoDispatchContext } from "../App";
import type { Todo } from "../App";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);

  const onChangeCheckbox = () => {
    onUpdate(todo.id);
  };

  const onClickDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={onChangeCheckbox}
      />
      <div className="content">{todo.content}</div>
      <div className="date">{new Date(todo.date).toLocaleDateString()}</div>
      <button onClick={onClickDelete}>삭제</button>
    </div>
  );
};

export default memo(TodoItem);
