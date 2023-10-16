import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
} from "@material-tailwind/react";

import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";

import { Todo } from "../types";

const TodoList: React.FC = () => {
  const [todoData, setTodoData] = useState<Todo[]>(() => {
    const localData = localStorage.getItem("TodoData");
    return localData ? JSON.parse(localData) : [];
  });
  const [filteredTodoData, setFilteredTodoData] = useState<Todo[]>(todoData);

  useEffect(() => {
    localStorage.setItem("TodoData", JSON.stringify(todoData));
  }, [todoData]);

  return (
    <Card className="w-full lg:w-1/2 mx-auto rounded-md text-white">
      <CardHeader
        shadow={true}
        floated={true}
        className="min-h-[50px] p-2 rounded-md flex flex-col sm:flex-row sm:justify-between gap-2"
      >
        <SearchTodo
          todoData={todoData}
          setFilteredTodoData={setFilteredTodoData}
        />
        <AddTodo setTodoData={setTodoData} />
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        {filteredTodoData.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setTodoData={setTodoData} />
        ))}
      </CardBody>
      <CardFooter className="pt-2 flex flex-wrap gap-2 items-center">
        <Chip value={`Total: ${filteredTodoData.length}`} />
        <Chip
          color="green"
          value={`Completed: ${
            filteredTodoData.filter((todo) => todo.done).length
          }`}
        />
        <Chip
          color="red"
          value={`Uncompleted: ${
            filteredTodoData.filter((todo) => !todo.done).length
          }`}
        />
      </CardFooter>
    </Card>
  );
};

export default TodoList;
