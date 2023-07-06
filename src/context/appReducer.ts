import { buildEmptyListData } from "@/service/utils";
import { DayCardData, DayListData, TodoListData } from "../../@types/schema";

export interface DayListDataState extends DayListData {}

export type Action =
  | { type: "ADD_DAY"; payload: DayCardData }
  | { type: "REMOVE_DAY"; payload: string }
  | { type: "ADD_TASK"; payload: TodoListData }
  | { type: "REMOVE_TASK"; payload: { date: string; id: string } }
  | { type: "UPDATE_TASK"; payload: TodoListData }
  | { type: "REORDER_TASK"; payload: { oldPos: number; newPos: number; id: string } }
  | { type: "MOVE_TASK"; payload: { oldDate: string; newDate: string; id: string; todo: TodoListData } };

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
      const { oldPos, newPos, id } = action.payload;
      const updatedDays = state.days.map((day) => {
        if (day.dayTodoList.find((task) => task.id === id)) {
          const newDayTodoList = day.dayTodoList.filter((task) => task.id !== id);
          newDayTodoList.splice(newPos, 0, day.dayTodoList[oldPos]);
          return {
            ...day,
            dayTodoList: newDayTodoList,
          };
        }
        return day;
      });
      return {
        ...state,
        days: updatedDays,
      };
    }
    case "MOVE_TASK": {
      const { oldDate, newDate, id, todo } = action.payload;
      const updatedDays = state.days
        .map((day) => {
          if (day.date === oldDate) {
            return {
              ...day,
              dayTodoList: day.dayTodoList.filter((task) => task.id !== id),
            };
          }
          return day;
        })
        .map((day) => {
          if (day.date === newDate) {
            return {
              ...day,
              dayTodoList: [...day.dayTodoList, todo],
            };
          }
          return day;
        });
      return {
        ...state,
        days: updatedDays,
      };
    }
    default:
      return state;
  }
};
