import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
        className="min-h-[50px] p-2 rounded-md flex justify-between flex-wrap gap-2"
      >
        <SearchTodo todoData={todoData} setFilteredTodoData={setFilteredTodoData} />
        <AddTodo setTodoData={setTodoData} />
      </CardHeader>
      <CardBody>
        <div className="p-4">
          {filteredTodoData.map((todo) => (
            <TodoItem key={todo.id} todo={todo} setTodoData={setTodoData} />
          ))}
        </div>
      </CardBody>
      <CardFooter className="pt-0"><div></div></CardFooter>
    </Card>
  );
};

export default TodoList;
