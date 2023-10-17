import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Alert,
  IconButton,
} from "@material-tailwind/react";

import {
  ExclamationCircleIcon,
  Bars3CenterLeftIcon,
} from "@heroicons/react/24/outline";

import TodoCard from "../card/Todo";
import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";

import { Todo, Category } from "../../types";

interface TodoListProps {
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  todoData: Todo[];
  setTodoData: React.Dispatch<React.SetStateAction<Todo[]>>;
  filteredTodoData: Todo[];
  setFilteredTodoData: (
    todoData: (prevFilteredTodoData: Todo[]) => Todo[]
  ) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  categories,
  todoData,
  setTodoData,
  filteredTodoData,
  setFilteredTodoData,
  setMenu,
}) => {
  return (
    <Card className="w-full mx-auto rounded-md text-white">
      <CardHeader
        shadow={true}
        floated={true}
        className="min-h-[50px] p-2 rounded-md flex flex-col sm:flex-row sm:justify-between gap-2"
      >
        {" "}
        <SearchTodo
          todoData={todoData}
          setFilteredTodoData={setFilteredTodoData}
        />
        <div className="flex gap-2 flex-wrap items-center justify-center">
          <IconButton
            className="block md:hidden"
            size="sm"
            onClick={() => setMenu(true)}
          >
            <Bars3CenterLeftIcon className="h-4 w-4" />
          </IconButton>

          <AddTodo setTodoData={setTodoData} categories={categories} />
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {filteredTodoData.length > 0 ? (
          filteredTodoData.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              todoData={todoData}
              setTodoData={setTodoData}
            />
          ))
        ) : (
          <Alert
            icon={<ExclamationCircleIcon />}
            className="rounded-none border-l-4 border-red-500 bg-red-500/10 font-medium text-red-500"
          >
            No Todo Found.
          </Alert>
        )}
      </CardBody>
    </Card>
  );
};

export default TodoList;
