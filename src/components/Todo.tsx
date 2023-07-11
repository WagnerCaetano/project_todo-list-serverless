"use client";
import { FunctionComponent, useState } from "react";
import { TodoListData } from "../../@types/schema";
import { useAppContext } from "@/context/AppContext";
import { Draggable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";

export type TodoProps = {
  todo: TodoListData;
  index: number;
};

const Todo: FunctionComponent<TodoProps> = ({ todo, index }) => {
  const [tempTodo, setTempTodo] = useState<TodoListData>(todo);
  const { dispatch } = useAppContext();

  const handleRemoveTodo = () => dispatch({ type: "REMOVE_TASK", payload: tempTodo });

  const handleSetTempTodo = (key: keyof TodoListData, data: any) => {
    if (!!data?.target?.value) {
      setTempTodo({
        ...tempTodo,
        [key]: data.target.value,
      });
    }
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        ...tempTodo,
        [key]: data.target.value,
      },
    });
    dispatch({
      type: "ORDER_BY_PRIORITY",
    });
  };

  const handleSetCompleted = (data) => {
    if (!!data?.target) {
      setTempTodo({
        ...tempTodo,
        completed: !!data.target.checked,
      });
      dispatch({
        type: "UPDATE_TASK",
        payload: {
          ...tempTodo,
          completed: !!data.target.checked,
        },
      });
    }
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`flex flex-row flex-shrink justify-around gap-3 rounded bg-zinc-800 mx-2 p-2 py-4 cursor-move transition-all duration-250 delay-250 ${
            snapshot.isDragging ? "border-2 border-dashed border-zinc-500" : ""
          } ${tempTodo.completed ? "bg-opacity-25" : ""}`}
        >
          <div className="self-center flex-shrink">
            <input
              className="appearance-none w-5 h-5 rounded-full bg-zinc-800 border-2 border-zinc-500 checked:bg-blue-500 checked:border-transparent focus:outline-none"
              type="checkbox"
              checked={tempTodo.completed}
              onChange={(data) => handleSetCompleted(data)}
            />
          </div>
          <div className={`flex flex-col overflow-clip`}>
            {tempTodo.title === "" ? (
              <input
                type="text"
                className="bg-transparent border-b-2 border-zinc-500 text-white focus:outline-none text-lg font-normal"
                onBlur={(data) => handleSetTempTodo("title", data)}
                placeholder="Title"
              />
            ) : (
              <input
                type="text"
                className="bg-transparent text-white focus:outline-none focus:border-b-2 focus:border-zinc-500 focus:font-normal text-lg font-semibold"
                onBlur={(data) => handleSetTempTodo("title", data)}
                defaultValue={tempTodo.title}
              />
            )}
            {tempTodo.description === "" ? (
              <input
                type="text"
                className="bg-transparent border-b-2 border-zinc-500 text-white text-sm"
                onBlur={(data) => handleSetTempTodo("description", data)}
                placeholder="Description"
              />
            ) : (
              <input
                type="text"
                className="bg-transparent text-white focus:outline-none focus:border-b-2 focus:border-zinc-500 text-sm"
                onBlur={(data) => handleSetTempTodo("description", data)}
                defaultValue={tempTodo.description}
              />
            )}
          </div>
          <div className="flex flex-col justify-between flex-shrink items-end">
            <select
              className={`appearance-none border-2 rounded border-zinc-500 text-white text-center hover:bg-zinc-500 focus:outline-none focus:border-b-2 focus:border-zinc-500 transition placeholder-gray-500 ${
                tempTodo.priority === "low"
                  ? "bg-green-500"
                  : tempTodo.priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              name="priority"
              id="priority"
              onChange={(data) => {
                handleSetTempTodo("priority", data);
              }}
              defaultValue={tempTodo.priority}
            >
              <option className="bg-zinc-800" value="low">
                Low
              </option>
              <option className="bg-zinc-800" value="medium">
                Medium
              </option>
              <option className="bg-zinc-800" value="high">
                High
              </option>
            </select>
            <FaTrash
              onClick={handleRemoveTodo}
              className="cursor-pointer hover:text-red-500 text-zinc-500 transition-all duration-250"
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
