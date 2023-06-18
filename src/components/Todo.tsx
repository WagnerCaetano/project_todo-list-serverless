import { FunctionComponent } from "react";
import { TodoListData } from "../../@types/schema";

export type TodoProps = {
  todo: TodoListData;
};

const Todo: FunctionComponent<TodoProps> = ({ todo }) => {
  return (
    <div className="flex flex-row justify-between">
      <p className="text-sm">{todo.title}</p>
      <button className="text-sm">X</button>
    </div>
  );
};

export default Todo;
