import { DayListData } from "../../@types/schema";

export function buildEmptyListData(): DayListData {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push({
      id: i,
      date: date.toISOString().slice(0, 10).replaceAll("-", "/"),
      dayTodoList: [],
    });
  }
  return { days };
}

export function create_UUID(): string {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}