export type TodoListData = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  date: string;
};

export type DayCardData = {
  id: number;
  date: string;
  dayTodoList: TodoListData[];
};

export type DayListData = {
  days: DayCardData[];
};