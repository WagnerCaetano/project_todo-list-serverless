import { FunctionComponent } from "react";
import DayCard from "./DayCard";
import { DayListData } from "../../@types/schema";

export type DayListProps = {
  data: DayListData;
};

const DayList: FunctionComponent<DayListProps> = ({ data }) => {
  console.log(data);

  return (
    <div className="flex items-center justify-center ">
      <div className="w-screen overflow-x-auto p-8">
        <ul className="flex flex-row gap-4 ">
          {data.days.map((day, dayIndex) => {
            return <DayCard day={day.date} dayIndex={dayIndex} todoList={day.dayTodoList} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default DayList;
