"use client";
import { FunctionComponent } from "react";
import DayCard from "./DayCard";
import { DayListData } from "../../@types/schema";
import { DragDropContext } from "react-beautiful-dnd";
import { useAppContext } from "@/context/AppContext";

export type DayListProps = {
  data: DayListData;
};

const DayList: FunctionComponent<DayListProps> = ({ data }) => {
  const { state, dispatch } = useAppContext();

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const start = state.days.find((day) => day.date === source.droppableId);
    const finish = state.days.find((day) => day.date === destination.droppableId);
    if (start === finish) {
      dispatch({
        type: "REORDER_TASK",
        payload: { source, destination },
      });
    } else {
      dispatch({
        type: "MOVE_TASK",
        payload: { start, source, finish, destination, state },
      });
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-screen overflow-x-auto p-8">
        <ul className="flex flex-row gap-4 ">
          <DragDropContext
            onDragStart={() => console.log("drag start")}
            onDragUpdate={() => console.log("drag update")}
            onDragEnd={onDragEnd}
          >
            {data.days.map((day) => {
              return <DayCard day={day.date} key={day.date} todoList={day.dayTodoList} />;
            })}
          </DragDropContext>
        </ul>
      </div>
    </div>
  );
};

export default DayList;
