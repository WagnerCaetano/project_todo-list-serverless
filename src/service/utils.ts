import { DayListData } from "../../@types/schema";
import { nanoid } from "nanoid";

export function buildEmptyListData(): DayListData {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push({
      id: nanoid(),
      date: date.toISOString().slice(0, 10).replaceAll("-", "/"),
      dayTodoList: [],
    });
  }
  return { days };
}