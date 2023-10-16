import React, { useState } from "react";

import {
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";

import { PlusIcon } from "@heroicons/react/24/outline";

import { Todo } from "../types";

interface AddTodoProps {
  setTodoData: (todoData: (prevTodoData: Todo[]) => Todo[]) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ setTodoData }) => {
  const categories = ["Work", "Home", "Personal"];

  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("Work");
  const [open, setOpen] = useState(false);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        content: inputValue,
        category: category,
        done: false,
      };
      setTodoData((prevTodoData) => [...prevTodoData, newTodo]);
      setInputValue("");
      setCategory("Work");
      setOpen(false);
    }
  };

  return (
    <Popover
      open={open}
      handler={(state) => setOpen(state)}
      placement="bottom-end"
    >
      <PopoverHandler>
        <Button variant="text" className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          New
        </Button>
      </PopoverHandler>
      <PopoverContent className="flex flex-col gap-3">
        <Select
          value={category}
          onChange={(value: any) => setCategory(value)}
          label="Select Category"
        >
          {categories.map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
        <Textarea
          onChange={(e) => setInputValue(e.target.value)}
          label="Content"
        />
        <Button size="sm" onClick={addTodo}>
          Add Todo
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default AddTodo;
