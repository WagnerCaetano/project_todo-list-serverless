"use client";
import React, { FunctionComponent } from "react";
import Todo from "./Todo";
import { TodoListData } from "../../@types/schema";
import { useAppContext } from "@/context/AppContext";
import { create_UUID } from "@/service/utils";
import { useDrop } from "react-dnd";

export type DayCardProps = {
  day: string;
  todoList: TodoListData[];
  dayIndex: number;
};

const DayCard: FunctionComponent<DayCardProps> = ({ day, todoList, dayIndex }) => {
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

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'todo-item',
    drop: () => ({
      targetDay: day,
    }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }), [dayIndex])

  return (
    <div className="rounded-lg p-2 flex-shrink-0 w-1/5 min-h-[720px] max-h-full shadow-xl bg-gray-700">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-row">
          <p className="text-xl text-center mx-auto">{dayFormatted}</p>
          <button onClick={handleAddTask}>+</button>
        </div>
        <div ref={dropRef} style={{display: 'flex', gap: 25, flexDirection: 'column', flex: 1, backgroundColor: isOver ? 'red' : 'unset', height: '100%'}}>
          {todoList.map((todo) => {
            return <Todo sourceDayDate={day} key={todo.id} todo={todo} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DayCard;
