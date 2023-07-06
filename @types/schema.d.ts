export type TodoListData = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  date: string;
};

export type DayCardData = {
  id: string;
  date: string;
  late: boolean;
  dayTodoList: TodoListData[];
};

export type DayListData = {
  days: DayCardData[];
};
