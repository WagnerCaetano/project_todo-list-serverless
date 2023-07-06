import { FunctionComponent, useState } from "react";
import { TodoListData } from "../../@types/schema";
import { useDrag, useDrop } from "react-dnd";
import { useAppContext } from "@/context/AppContext";

export type TodoProps = {
  todo: TodoListData;
  sourceDayDate: string;
};

const Todo: FunctionComponent<TodoProps> = ({ todo, sourceDayDate }) => {
  const [tempTodo, setTempTodo] = useState<TodoListData>(todo);
  const { dispatch } = useAppContext();

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

  const handleSetTempTodo = (key: keyof TodoListData, data: any) => {
    if (!!data?.target?.value) {
      setTempTodo({
        ...tempTodo,
        [key]: data.target.value,
      });
    }
  };

  const [{ isDragging }, todoRefDrag] = useDrag(() => ({
    type: "todo-day",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      console.log(tempTodo);
      const dropResult: any = monitor.getDropResult();
      const newTask: TodoListData = {
        ...tempTodo,
      };
      newTask.date = dropResult?.targetDay;
      if (dropResult) {
        dispatch({
          type: "MOVE_TASK",
          payload: {
            oldDate: sourceDayDate,
            newDate: newTask.date,
            id: tempTodo.id,
            todo: newTask,
          },
        });
      }
    },
  }));

  return (
    <div
      ref={todoRefDrag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex flex-col gap-2 justify-between bg-gray-950 p-2 py-4 cursor-move"
    >
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
