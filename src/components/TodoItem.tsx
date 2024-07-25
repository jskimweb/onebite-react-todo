import "./TodoItem.css";
import type { Todo } from "../App";

const TodoItem = ({ isDone, content, date }: Todo) => {
  return (
    <div className="TodoItem">
      <input type="checkbox" checked={isDone} readOnly />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button>삭제</button>
    </div>
  );
};

export default TodoItem;
