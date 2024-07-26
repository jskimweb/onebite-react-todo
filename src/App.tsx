import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import { createContext, useCallback, useReducer, useRef, useMemo } from "react";

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

interface TodoDispatchContext {
  onCreate: (content: string) => void;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
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

export const TodoStateContext = createContext<Todo[]>(MOCK_DATA);
export const TodoDispatchContext = createContext<TodoDispatchContext>({
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
});

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

  const memoizedDispatch = useMemo(
    () => ({ onCreate, onUpdate, onDelete }),
    []
  );

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
