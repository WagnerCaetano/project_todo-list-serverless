"use client";
import { FunctionComponent } from "react";
import Todo from "./Todo";
import { TodoListData } from "../../@types/schema";
import { useAppContext } from "@/context/AppContext";
import { create_UUID } from "@/service/utils";

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
        id: create_UUID(),
        priority: "low",
        title: "",
      },
    });
    console.log(state);
  };
  return (
    <div className="rounded-lg p-2 flex-shrink-0 w-1/5 min-h-[720px] max-h-full shadow-xl bg-gray-700">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <p className="text-xl text-center mx-auto">{dayFormatted}</p>
          <button onClick={handleAddTask}>+</button>
        </div>
        {todoList.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
      </div>
    </div>
  );
};

export default DayCard;
