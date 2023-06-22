import { Dispatch, FunctionComponent } from "react";
import DayCard from "./DayCard";
import { DayListData } from "../../@types/schema";
import { Action } from "@/context/appReducer";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

export type DayListProps = {
  data: DayListData;
  dispatch?: Dispatch<Action>;
};

const DayList: FunctionComponent<DayListProps> = ({ data, dispatch }) => {
  const handleEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceDayId = result.source.droppableId;
    const destinationDayId = result.destination.droppableId;

    if (sourceDayId === destinationDayId) {
      // Reordering within the same day
      const day = data.days.find((d) => d.id === sourceDayId);
      const updatedTodoList = Array.from(day.dayTodoList);
      const [movedTask] = updatedTodoList.splice(result.source.index, 1);
      updatedTodoList.splice(result.destination.index, 0, movedTask);

      dispatch({
        type: "REORDER_TASK",
        payload: updatedTodoList,
      });
    } else {
      // Moving to a different day
      const sourceDay = data.days.find((d) => d.id === sourceDayId);
      const destinationDay = data.days.find((d) => d.id === destinationDayId);

      const updatedSourceTodoList = Array.from(sourceDay.dayTodoList);
      const updatedDestinationTodoList = Array.from(destinationDay.dayTodoList);

      const [movedTask] = updatedSourceTodoList.splice(result.source.index, 1);
      movedTask.date = destinationDay.date;
      updatedDestinationTodoList.splice(result.destination.index, 0, movedTask);

      dispatch({
        type: "MOVE_TASK",
        payload: {
          source: updatedSourceTodoList,
          destination: updatedDestinationTodoList,
        },
      });
    }
  };

  console.log(data);
  return (
    <div className="flex items-center justify-center ">
      <div className="w-screen overflow-x-auto p-8">
        <ul className="flex flex-row gap-4 ">
          <DragDropContext onDragEnd={handleEnd}>
            {data.days.map((day) => {
              return <DayCard key={day.id} day={day.date} id={day.id} todoList={day.dayTodoList} dispatch={dispatch} />;
            })}
          </DragDropContext>
        </ul>
      </div>
    </div>
  );
};

export default DayList;
