import { DayListData } from "../../@types/schema";

export function buildEmptyListData(): DayListData {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push({
      id: i,
      date: date.toISOString(),
      dayTodoList: [],
    });
  }
  return { days };
}
