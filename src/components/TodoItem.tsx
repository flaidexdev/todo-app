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

type Color =
  | "blue"
  | "red"
  | "green"
  | "amber"
  | "pink"
  | "indigo"
  | "purple"
  | "teal"
  | "cyan";

const colors: Color[] = [
  "blue",
  "red",
  "green",
  "amber",
  "pink",
  "indigo",
  "purple",
  "teal",
  "cyan",
];

const getHashedValue = (input: string): number => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash;
};

const getColorForCategory = (category: string): Color => {
  const hashValue = getHashedValue(category);
  const index = Math.abs(hashValue) % colors.length;
  return colors[index];
};

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
      toast("Todo Uncompleted Successfully!");
    } else {
      toast("Todo Completed Successfully!");
    }
  };

  const removeTodo = (id: number) => {
    setTodoData((prevTodoData) =>
      prevTodoData.filter((todo) => todo.id !== id)
    );
    toast("Todo Removed Successfully!");
  };

  return (
    <Card className="rounded-md">
      <CardBody className="p-4">
        <div className="grid gap-4 grid-cols-12 items-center">
          <div className="col-span-12 md:col-span-8">
            <div className={`${todo.done && "line-through text-gray-400"}`}>
              {todo.content}
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center justify-end flex-wrap gap-2 ">
              <Chip
                color={getColorForCategory(todo.category)}
                size="sm"
                value={todo.category}
              />
              <Tooltip
                content={`${todo.done ? "Incomplete Todo" : "Complete Todo"}`}
              >
                <ArrowPathRoundedSquareIcon
                  data-testid="complete"
                  className="h-4 w-4 hover:text-green-500 cursor-pointer"
                  onClick={() => toggleDone(todo.id)}
                />
              </Tooltip>
              <Tooltip content={"Copy Todo Content"}>
                <ClipboardIcon
                  data-testid="copy"
                  className="h-4 w-4 hover:text-green-500 cursor-pointer"
                  onClick={copyToClipboard}
                />
              </Tooltip>
              <Tooltip content={"Remove Todo"}>
                <TrashIcon
                  data-testid="remove"
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
