import "./Editor.css";
import type { ChangeEvent, KeyboardEvent } from "react";
import { useState, useRef, useContext } from "react";
import { TodoDispatchContext } from "../App";

const Editor = () => {
  const { onCreate } = useContext(TodoDispatchContext);
  const [content, setContent] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeContent = (e: ChangeEvent) => {
    setContent((e.target as HTMLInputElement).value);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (content.trim() === "") {
      inputRef.current?.focus();
    } else {
      onCreate(content);
    }

    setContent("");
  };

  return (
    <div className="Editor">
      <input
        ref={inputRef}
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
        placeholder="새로운 Todo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
