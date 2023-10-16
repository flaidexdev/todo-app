import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Textarea,
} from "@material-tailwind/react";

import TodoItem from "../todo-item";

import { Todo } from "../../types";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("");
  const categories = ["Work", "Home", "Personal"];

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: inputValue,
        category: category,
        done: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
      setCategory("");
      setOpen(false)
    }
  };

 

  return (
    <Card className="w-full lg:w-1/2 mx-auto rounded-md text-white">
      <CardHeader
        shadow={true}
        floated={true}
        className=" min-h-[50px] p-2 rounded-md flex justify-between flex-wrap gap-2"
      >
        <input
            type="text"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
        <Popover placement="bottom-end">
          <PopoverHandler>
            <Button>New</Button>
          </PopoverHandler>
          <PopoverContent>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <Textarea
              onChange={(e) => setInputValue(e.target.value)}
              label="Content"
            />
            <Button size="sm" onClick={addTodo}>
              Add Todo
            </Button>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardBody>
        <div className="p-4">
         
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))}
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        
      </CardFooter>
    </Card>
  );
};

export default TodoList;
