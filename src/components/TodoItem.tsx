import { Todo } from "../types";

import { Card, CardBody, Chip, Tooltip } from "@material-tailwind/react";
import { toast } from "react-toastify";
import {
  ClipboardIcon,
  TrashIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";

interface TodoItemProps {
  todo: Todo;
  setTodoData: (todoData: (prevTodoData: Todo[]) => Todo[]) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, setTodoData }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(todo.content);
    toast("Copied To Clipboard Successfully!");
  };

  const toggleDone = (id: number) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
    if (todo.done) {
      toast("Task Uncompleted Successfully!");
    } else {
      toast("Task Completed Successfully!");
    }
  };

  const removeTodo = (id: number) => {
    setTodoData((prevTodoData) =>
      prevTodoData.filter((todo) => todo.id !== id)
    );
    toast("Task Removed Successfully!");
  };

  return (
    <Card className={`rounded-md ${todo.done ? "" : ""}`}>
      <CardBody className="p-4">
        <div className="grid gap-2 grid-cols-12 items-center">
          <div className="col-span-12 md:col-span-8">
            <div
              className={`  ${todo.done ? "line-through text-gray-400" : ""}`}
            >
              {todo.content}
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center justify-end flex-wrap gap-2 ">
              <Chip
                color={`${
                  todo.category === "Work"
                    ? "green"
                    : todo.category === "Personal"
                    ? "teal"
                    : "purple"
                }`}
                size="sm"
                value={todo.category}
              />
              <Tooltip
                content={`${todo.done ? "Incomplete Todo" : "Complete Todo"}`}
              >
                <ArrowPathRoundedSquareIcon
                  className="h-4 w-4 hover:text-green-500 cursor-pointer"
                  onClick={() => toggleDone(todo.id)}
                />
              </Tooltip>
              <Tooltip content={"Copy Todo Content"}>
                <ClipboardIcon
                  className="h-4 w-4 hover:text-green-500 cursor-pointer"
                  onClick={copyToClipboard}
                />
              </Tooltip>
              <Tooltip content={"Remove Todo"}>
                <TrashIcon
                  className="h-4 w-4 hover:text-red-500 cursor-pointer"
                  onClick={() => removeTodo(todo.id)}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TodoItem;
