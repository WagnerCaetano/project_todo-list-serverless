import { Dispatch, FunctionComponent, useState } from "react";
import { TodoListData } from "../../@types/schema";
import { Action } from "@/context/appReducer";

export type TodoProps = {
  todo: TodoListData;
  dispatch?: Dispatch<Action>;
};

const Todo: FunctionComponent<TodoProps> = ({ todo, dispatch }) => {
  const [tempTodo, setTempTodo] = useState<TodoListData>(todo);

  const handleSetTempTodo = (key: keyof TodoListData, data: any) => {
    if (!!data?.target?.value) {
      setTempTodo({
        ...tempTodo,
        [key]: data.target.value,
      });
    }
  };

  const handleSaveTodo = () => {
    if (tempTodo.title === "" || tempTodo.description === "") {
      return;
    }
    dispatch({
      type: "UPDATE_TASK",
      payload: tempTodo,
    });
  };

  const handleRemoveTodo = () => dispatch({ type: "REMOVE_TASK", payload: tempTodo });

  return (
    <div className="flex flex-col gap-2 justify-between bg-gray-950 p-2 py-4">
      {todo.title === "" ? (
        <input
          type="text"
          className="bg-transparent border-b-2 border-slate-500 text-white"
          onBlur={(data) => handleSetTempTodo("title", data)}
          placeholder="Title"
        />
      ) : (
        <input type="text" className="bg-transparent border-b-2 border-slate-500 text-white" value={todo.title} />
      )}
      {todo.description === "" ? (
        <input
          type="text"
          className="bg-transparent border-b-2 border-slate-500 text-white"
          onBlur={(data) => handleSetTempTodo("description", data)}
          placeholder="Description"
        />
      ) : (
        <input type="text" className="bg-transparent border-b-2 border-slate-500 text-white" value={todo.description} />
      )}
      <select
        className="bg-transparent text-white"
        name="priority"
        id="priority"
        onChange={(data) => handleSetTempTodo("priority", data)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <div className="flex flex-row gap-2">
        <input
          type="checkbox"
          onChange={(data) => {
            handleSetTempTodo("completed", data.target.value == "on");
          }}
        />
        <button className=" text-white" onClick={handleSaveTodo}>
          Save
        </button>
        <button className=" text-white" onClick={handleRemoveTodo}>
          {" "}
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
