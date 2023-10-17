import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Alert,
} from "@material-tailwind/react";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";
import CategoryList from "./Category";

import { Todo, Category } from "../types";

const TodoList: React.FC = () => {
  const [todoData, setTodoData] = useState<Todo[]>(() => {
    const localData = localStorage.getItem("TodoData");
    return localData ? JSON.parse(localData) : [];
  });
  const [categories, setCategories] = useState<Category[]>(() => {
    const localData = localStorage.getItem("CategoryData");
    return localData ? JSON.parse(localData) : ["Work", "Home", "Personal"];
  });
  const [filteredTodoData, setFilteredTodoData] = useState<Todo[]>(todoData);

  useEffect(() => {
    if (todoData.length > 0) {
      localStorage.setItem("TodoData", JSON.stringify(todoData));
    }
    if (categories.length > 0) {
      localStorage.setItem("CategoryData", JSON.stringify(categories));
    }
  }, [todoData, categories]);

  return (
    <Card className="w-full mx-auto rounded-md text-white">
      <CardHeader
        shadow={true}
        floated={true}
        className="min-h-[50px] p-2 rounded-md flex flex-col sm:flex-row sm:justify-between gap-2"
      >
        <SearchTodo
          todoData={todoData}
          setFilteredTodoData={setFilteredTodoData}
        />
        <AddTodo setTodoData={setTodoData} categories={categories} />
      </CardHeader>
      <CardBody className="grid grid-cols-12 gap-6">
        <div className="flex flex-col gap-2 col-span-12 md:col-span-4">
          <Card>
            <CardBody className="flex flex-col gap-2">
              <Typography>Status: </Typography>
              <div className="flex flex-wrap gap-2 items-center">
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
              </div>
            </CardBody>
          </Card>
          <CategoryList
            categories={categories}
            setCategories={setCategories}
            todoData={todoData}
            setTodoData={setTodoData}
            setFilteredTodoData={setFilteredTodoData}
          />
        </div>

        <div className="flex flex-col gap-2 col-span-12 md:col-span-8">
          {filteredTodoData.length > 0 ? filteredTodoData.map((todo) => (
            <TodoItem key={todo.id} todo={todo} setTodoData={setTodoData} />
          )): <Alert
          icon={<ExclamationCircleIcon />}
          className="rounded-none border-l-4 border-red-500 bg-red-500/10 font-medium text-red-500"
        >
          No Todo Found.
        </Alert>}
        </div>
      </CardBody>
    </Card>
  );
};

export default TodoList;
