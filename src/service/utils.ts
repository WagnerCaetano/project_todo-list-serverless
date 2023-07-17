import { DayListData } from "../../@types/schema";

export function buildEmptyListData(qtdToGenerate = 7, nextIndex = 0): DayListData {
  const days = [];
  for (let i = 0; i < qtdToGenerate; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i + nextIndex);
    days.push({
      id: date.toISOString().slice(0, 10).replaceAll("-", ""),
      date: date.toISOString().slice(0, 10).replaceAll("-", "/"),
      dayTodoList: [],
      late: false,
    });
  }
  return { days };
}