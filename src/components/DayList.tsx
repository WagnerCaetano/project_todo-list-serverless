import { FunctionComponent } from "react";
import DayCard from "./DayCard";
import { DayListData } from "../../@types/schema";
import { DragDropContext } from "react-beautiful-dnd";

export type DayListProps = {
  data: DayListData;
};

const DayList: FunctionComponent<DayListProps> = ({ data }) => {
  console.log(data.days);
  const onDragEnd = (result) => {
    // TODO: reorder our column
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-screen overflow-x-auto p-8">
        <ul className="flex flex-row gap-4 ">
          <DragDropContext
            onDragStart={() => console.log("drag start")}
            onDragUpdate={() => console.log("drag update")}
            onDragEnd={() => console.log("drag end")}
          >
            {data.days.map((day) => {
              return <DayCard day={day.date} todoList={day.dayTodoList} />;
            })}
          </DragDropContext>
        </ul>
      </div>
    </div>
  );
};

export default DayList;
