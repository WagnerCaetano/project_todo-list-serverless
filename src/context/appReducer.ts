import { buildEmptyListData } from "@/service/utils";
import { DayCardData, DayListData, TodoListData } from "../../@types/schema";

export interface DayListDataState extends DayListData {}

export type Action =
  | { type: "ADD_DAY"; payload: DayCardData }
  | { type: "REMOVE_DAY"; payload: string }
  | { type: "ADD_TASK"; payload: TodoListData }
  | { type: "REMOVE_TASK"; payload: TodoListData };

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
    default:
      return state;
  }
};
