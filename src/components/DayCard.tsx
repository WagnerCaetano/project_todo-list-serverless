"use client";
import { FunctionComponent } from "react";
import Todo from "./Todo";
import { TodoListData } from "../../@types/schema";

export type DayCardProps = {
  day: string;
  todoList: TodoListData[];
};

const DayCard: FunctionComponent<DayCardProps> = ({ day, todoList }) => {
  return (
    <div className="border-slate-500 border-2 rounded-lg p-4 flex-shrink-0 w-1/5 min-h-[720px] max-h-full shadow-xl bg-gray-700">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <p className="text-xl text-center mx-auto">{day.slice(0, 10).replaceAll("-", "/")}</p>
          <button onClick={() => console.log("add taskk")}>+</button>
        </div>
        {todoList.map((todo) => {
          return <Todo todo={todo} />;
        })}
      </div>
    </div>
  );
};

export default DayCard;
