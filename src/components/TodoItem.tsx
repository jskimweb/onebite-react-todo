import "./TodoItem.css";
import type { Todo } from "../App";

interface Props {
  todo: Todo;
  onUpdate: (id: number) => void;
}

const TodoItem = ({ todo, onUpdate }: Props) => {
  const onChangeCheckbox = () => {
    onUpdate(todo.id);
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
      <button>삭제</button>
    </div>
  );
};

export default TodoItem;
