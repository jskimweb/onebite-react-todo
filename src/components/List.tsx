import "./List.css";
import TodoItem from "./TodoItem";
import type { Todo } from "../App";
import type { ChangeEvent } from "react";
import { useState } from "react";

const List = ({ todos }: { todos: Todo[] }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: ChangeEvent) => {
    setSearch((e.target as HTMLInputElement).value);
  };

  const getFilteredData = () => {
    if (search.trim() === "") return todos;

    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredTodos = getFilteredData();

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo: Todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default List;
