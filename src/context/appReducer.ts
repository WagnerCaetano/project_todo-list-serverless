import { DayListData, TodoListData } from "../../@types/schema";

export interface DayListDataState extends DayListData {}

export const initialState: DayListDataState = {
  days: [],
};
export const AppReducer = (
  state: DayListDataState,
  action: { type: "add_todo_task" | "init_stored"; value: TodoListData; day: string }
) => {
  switch (action.type) {
    case "init_stored": {
      return action.value;
    }

    case "add_todo_task": {
      return {
        ...state,
        days: state.days.map((day) => {
          if (day.date === action.day) {
            return {
              ...day,
              dayTodoList: [...day.dayTodoList, action.value],
            };
          }
          return day;
        }),
      };
    }
  }
};
