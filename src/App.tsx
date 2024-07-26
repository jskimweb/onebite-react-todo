import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import { useCallback, useReducer, useRef } from "react";

export interface Todo {
  id: number;
  isDone: boolean;
  content: string;
  date: number;
}

interface CreateAction {
  type: string;
  data: Todo;
}

interface UpdateAction {
  type: string;
  id: number;
}

const MOCK_DATA: Todo[] = [
  {
    id: 2,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 0,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];

function reducer(state: Todo[], action: CreateAction | UpdateAction) {
  switch (action.type) {
    case "CREATE":
      return [(action as CreateAction).data, ...state];
    case "UPDATE":
      return state.map((todo) =>
        todo.id === (action as UpdateAction).id
          ? { ...todo, isDone: !todo.isDone }
          : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== (action as UpdateAction).id);
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, MOCK_DATA);
  const id = useRef(3);

  const onCreate = useCallback((content: string) => {
    dispatch({
      type: "CREATE",
      data: {
        id: id.current++,
        isDone: false,
        content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((id: number) => {
    dispatch({
      type: "UPDATE",
      id,
    });
  }, []);

  const onDelete = useCallback((id: number) => {
    dispatch({
      type: "DELETE",
      id,
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
