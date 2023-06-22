import { buildEmptyListData } from "@/service/utils";
import { DayCardData, DayListData, TodoListData } from "../../@types/schema";

export interface DayListDataState extends DayListData {}

export const initialState: DayListDataState = buildEmptyListData();

export type Action =
  | { type: "ADD_DAY"; payload: DayCardData }
  | { type: "REMOVE_DAY"; payload: string }
  | { type: "ADD_TASK"; payload: TodoListData }
  | { type: "REMOVE_TASK"; payload: TodoListData }
  | { type: "UPDATE_TASK"; payload: TodoListData }
  | { type: "REORDER_TASK"; payload: TodoListData[] }
  | { type: "MOVE_TASK"; payload: any };

export const AppReducer = (state: DayListData, action: Action): DayListData => {
  switch (action.type) {
    case "ADD_DAY":
      return {
        ...state,
        days: [...state.days, action.payload],
      };
    case "REMOVE_DAY":
      return {
        ...state,
        days: state.days.filter((day) => day.id !== action.payload),
      };
    case "ADD_TASK": {
      const todoList = action.payload;
      const updatedDays = state.days.map((day) => {
        if (day.date === todoList.date) {
          return {
            ...day,
            dayTodoList: [...day.dayTodoList, todoList],
          };
        }
        return day;
      });
      return {
        ...state,
        days: updatedDays,
      };
    }
    case "REMOVE_TASK": {
      const todo = action.payload;
      const updatedDays = state.days.map((day) => {
        if (day.date === todo.date) {
          return {
            ...day,
            dayTodoList: day.dayTodoList.filter((todo) => todo.id !== todo.id),
          };
        }
        return day;
      });
      return {
        ...state,
        days: updatedDays,
      };
    }
    case "UPDATE_TASK": {
      const todo = action.payload;
      const updatedDays = state.days.map((day) => {
        if (day.id === todo.id) {
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
      const todo = action.payload;
      const updatedDays = state.days.map((day) => {
        if (day.date === todo[0].date) {
          return {
            ...day,
            dayTodoList: todo,
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
      const { source, destination } = action.payload;
      const updatedDays = state.days.map((day) => {
        if (day.date === source.droppableId) {
          const newDayTodoList = [...day.dayTodoList];
          const [removed] = newDayTodoList.splice(source.index, 1);
          newDayTodoList.splice(destination.index, 0, removed);
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
    default:
      return state;
  }
};
