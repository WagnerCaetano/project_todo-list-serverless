"use client";
import React, { FunctionComponent } from "react";
import Todo from "./Todo";
import { TodoListData } from "../../@types/schema";
import { useAppContext } from "@/context/AppContext";
import { nanoid } from "nanoid";
import { Droppable } from "react-beautiful-dnd";
import { FaPlusCircle } from "react-icons/fa";

export type DayCardProps = {
  day: string;
  todoList: TodoListData[];
};

const DayCard: FunctionComponent<DayCardProps> = ({ day, todoList }) => {
  const { state, dispatch } = useAppContext();
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
    <div className="rounded-lg p-2 flex-shrink-0 w-1/5 min-h-[720px] max-h-full shadow-xl bg-zinc-950 ">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-row">
          <p className="text-xl text-center mx-auto">{dayFormatted}</p>
          <FaPlusCircle
            className="hover:text-green-500 transform transition-all duration-250 delay-250 cursor-pointer 
          text-xl text-gray-500"
            onClick={handleAddTask}
          />
        </div>
        <Droppable droppableId={dayFormatted}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex flex-col flex-1 gap-6 h-full rounded transition-all duration-250 delay-250 p-2 ${
                snapshot.isDraggingOver ? "bg-zinc-900" : ""
              }`}
            >
              {todoList.map((todo, index) => {
                return <Todo key={todo.id} todo={todo} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default DayCard;
