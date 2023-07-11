import { buildEmptyListData } from "@/service/utils";
import { DayCardData, DayListData, TodoListData } from "../../@types/schema";

export interface DayListDataState extends DayListData {}

export type Action =
  | { type: "ADD_DAY"; payload: DayCardData }
  | { type: "REMOVE_DAY"; payload: string }
  | { type: "ADD_TASK"; payload: TodoListData }
  | { type: "REMOVE_TASK"; payload: { date: string; id: string } }
  | { type: "UPDATE_TASK"; payload: TodoListData }
  | { type: "REORDER_TASK"; payload: { source: any; destination: any } }
  | {
      type: "MOVE_TASK";
      payload: { start: DayCardData; source: any; finish: DayCardData; destination: any; state: DayListDataState };
    }
  | {
      type: "ORDER_BY_PRIORITY";
    };

export const initialState: DayListDataState = buildEmptyListData();

export const AppReducer = (state: DayListDataState, action: Action): DayListDataState => {
  switch (action.type) {
    case "ADD_DAY":
      return {
        ...state,
        days: [...state.days, action.payload],
      };
    case "REMOVE_DAY":
      return {
        ...state,
        days: state.days.filter((day) => day.date !== action.payload),
      };
    case "ADD_TASK":
      return {
        ...state,
        days: state.days.map((day) => {
          if (day.date === action.payload.date) {
            return {
              ...day,
              dayTodoList: [...day.dayTodoList, action.payload],
            };
          }
          return day;
        }),
      };
    case "REMOVE_TASK":
      return {
        ...state,
        days: state.days.map((day) => {
          if (day.date === action.payload.date) {
            return {
              ...day,
              dayTodoList: day.dayTodoList.filter((task) => task.id !== action.payload.id),
            };
          }
          return day;
        }),
      };
    case "UPDATE_TASK": {
      const todo = action.payload;
      const updatedDays = state.days.map((day) => {
        if (day.date === todo.date) {
          return {
            ...day,
            dayTodoList: day.dayTodoList.map((t) => (t.id === todo.id ? todo : t)),
          };
        }
        return day;
      });
      return {
        ...state,
        days: updatedDays,
      };
    }
    case "REORDER_TASK": {
      const { source, destination } = action.payload;
      const column = state.days.find((day) => day.date.slice(0, 10).replaceAll("-", "/") === source.droppableId);
      const newTaskIds = Array.from(column.dayTodoList);
      const deleted = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, deleted[0]);

      const newColumn = {
        ...column,
        dayTodoList: newTaskIds,
      };

      return {
        ...state,
        days: state.days.map((day) => {
          if (day.date.slice(0, 10).replaceAll("-", "/") === newColumn.date.slice(0, 10).replaceAll("-", "/")) {
            return newColumn;
          } else {
            return day;
          }
        }),
      };
    }
    case "MOVE_TASK": {
      const { start, source, finish, destination, state } = action.payload;
      const startTodoList = Array.from(start.dayTodoList);
      const deleted = startTodoList.splice(source.index, 1);
      const newStart = {
        ...start,
        dayTodoList: startTodoList,
      };
      const finishTodoList = Array.from(finish.dayTodoList);
      finishTodoList.splice(destination.index, 0, deleted[0]);
      const newFinish = {
        ...finish,
        dayTodoList: finishTodoList,
      };

      return {
        ...state,
        days: state.days.map((day) => {
          if (day.date === newStart.date) {
            return newStart;
          } else if (day.date === newFinish.date) {
            return newFinish;
          } else {
            return day;
          }
        }),
      };
    }
    case "ORDER_BY_PRIORITY": {
      const newDays = state.days.map((day) => {
        const newDayTodoList = day.dayTodoList.sort((a, b) => {
          if (a.priority === b.priority) {
            return 0;
          } else if (a.priority === "high") {
            return -1;
          } else if (a.priority === "medium" && b.priority === "low") {
            return -1;
          } else if (a.priority === "medium" && b.priority === "high") {
            return 1;
          } else if (a.priority === "low") {
            return 1;
          }
          return 0;
        });
        return {
          ...day,
          dayTodoList: newDayTodoList,
        };
      });
      return {
        ...state,
        days: newDays,
      };
    }
    default:
      return state;
  }
};
