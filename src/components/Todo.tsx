import { FunctionComponent, useState } from "react";
import { TodoListData } from "../../@types/schema";

export type TodoProps = {
  todo: TodoListData;
};

const Todo: FunctionComponent<TodoProps> = ({ todo }) => {
  const [tempTodo, setTempTodo] = useState<TodoListData>(null);

  const handleSetTempTodo = (key: keyof TodoListData, data: any) => {
    if (!!data?.target?.value) {
      setTempTodo({
        ...tempTodo,
        [key]: data,
      });
    }
  };

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
        <button className=" text-white">Save</button>
        <button className=" text-white">Delete</button>
      </div>
    </div>
  );
};

export default Todo;
