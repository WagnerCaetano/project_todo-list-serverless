"use client";
import { Dispatch, FunctionComponent } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Todo from "./Todo";
import { TodoListData } from "../../@types/schema";
import { Action } from "@/context/appReducer";
import { nanoid } from "nanoid";

export type DayCardProps = {
  id: string;
  day: string;
  todoList: TodoListData[];
  dispatch?: Dispatch<Action>;
};

const DayCard: FunctionComponent<DayCardProps> = ({ day, id, todoList, dispatch }) => {
  const dayFormatted = day.slice(0, 10).replaceAll("-", "/");

  const handleAddTask = () => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        completed: false,
        date: dayFormatted,
        description: "",
        id: nanoid(),
        priority: "low",
        title: "",
      },
    });
  };

  return (
    <div className="rounded-lg p-2 flex-shrink-0 w-1/5 min-h-[720px] max-h-full shadow-xl bg-gray-700">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <p className="text-xl text-center mx-auto">{dayFormatted}</p>
          <button onClick={handleAddTask}>+</button>
        </div>
        <Droppable droppableId={id}>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-4">
              {todoList.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      key={todo.id}
                    >
                      <Todo todo={todo} dispatch={dispatch} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default DayCard;
