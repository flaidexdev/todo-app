import React, { useState } from "react";

import { toast } from "react-toastify";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";

import { PlusIcon } from "@heroicons/react/24/outline";

import { Todo, Category } from "../types";

interface AddTodoProps {
  setTodoData: (todoData: (prevTodoData: Todo[]) => Todo[]) => void;
  categories: Category[];
}

const AddTodo: React.FC<AddTodoProps> = ({ setTodoData, categories }) => {
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState(categories[0] ?? "");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const addTodo = () => {
    if (inputValue.trim() && category !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        content: inputValue,
        category: category,
        done: false,
      };
      setTodoData((prevTodoData) => [...prevTodoData, newTodo]);
      setInputValue("");
      setCategory(categories[0] ?? "");
      setOpen(false);
      toast("Todo Added Successfully!");
    } else {
      if (inputValue.trim() === "" && category === "") {
        toast.error("Todo Content & Category Field Can't be Empty!");
      } else if (inputValue.trim() === "") {
        toast.error("Todo Content Field Can't be Empty!");
      } else if (category === "") {
        toast.error("Todo Category Field Can't be Empty!");
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        data-testid="createNew"
        size="sm"
        className="flex items-center justify-center gap-2"
      >
        <PlusIcon className="h-4 w-4" />
        Create New
      </Button>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Create a new Todo.</DialogHeader>
        <DialogBody className="flex flex-col gap-3" divider>
          <Select
            data-testid="category"
            value={category}
            onChange={(value: any) => setCategory(value)}
            label="Select Category"
          >
            {categories.map((cat) => (
              <Option data-testid={cat} key={cat} value={cat}>
                <span className="uppercase text-xs">{cat}</span>
              </Option>
            ))}
          </Select>
          <Textarea
            data-testid="content"
            onChange={(e) => setInputValue(e.target.value)}
            label="Content"
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
            size="sm"
          >
            <span>Cancel</span>
          </Button>
          <Button size="sm" data-testid="addTodo" onClick={addTodo}>
            <span>Add Todo</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddTodo;
