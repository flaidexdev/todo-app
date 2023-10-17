import { useState, useEffect } from "react";
import type { FC } from "react";

import { toast } from "react-toastify";

import {
  Card,
  Popover,
  PopoverHandler,
  PopoverContent,
  CardBody,
  Typography,
  Tooltip,
  Textarea,
  Button,
  IconButton,
} from "@material-tailwind/react";

import {
  ExclamationCircleIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { Todo, Category } from "../types";

interface CategoryListProps {
  categories: Category[];
  setCategories: (category: (prevCategories: Category[]) => Category[]) => void;
  todoData: Todo[];
  setTodoData: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilteredTodoData: (
    todoData: (prevFilteredTodoData: Todo[]) => Todo[]
  ) => void;
}

const CategoryList: FC<CategoryListProps> = ({
  categories,
  setCategories,
  todoData,
  setTodoData,
  setFilteredTodoData,
}) => {
  const [category, setCategory] = useState<Category>("All");
  const [inputValue, setInputValue] = useState<string>("");
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [warnPopover, setWarnPopover] = useState<string>("");

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  const addCategory = () => {
    if (inputValue.trim() && !categories.includes(inputValue)) {
      const newTodo: Category = inputValue;
      setCategories((prevCategories) => [...prevCategories, newTodo]);
      setInputValue("");
      setOpenPopover(false);
      toast("Category Added Successfully!");
    } else {
      if (inputValue.trim() === "") {
        toast.error("Category Field Can't be Empty!");
      }
    }
  };

  const removeCategory = (categoryToRemove: Category) => {
    const updatedTodoData = todoData.filter(
      (todo) => todo.category !== categoryToRemove
    );
    setTodoData(updatedTodoData);
    setCategories((prevCategories) =>
      prevCategories.filter((c) => c !== categoryToRemove)
    );
    setWarnPopover("");
    toast("Category with related Todo Deleted Successfully!");

    // If the removed category is the current category, set a default one after a timeout
    if (category === categoryToRemove) {
      setTimeout(() => {
        setCategory("All");
      }, 1000); // 1 second timeout
    }
  };

  useEffect(() => {
    if (category !== "" && category !== "All") {
      setFilteredTodoData((prevFilteredTodoData) =>
        todoData.filter((todo) =>
          todo.category.toLowerCase().includes(category.toLowerCase())
        )
      );
    } else {
      setFilteredTodoData(() => todoData);
    }
  }, [category, todoData, setFilteredTodoData]);

  return (
    <Card>
      <CardBody className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Typography>Category</Typography>
          <Popover open={openPopover} handler={setOpenPopover}>
            <PopoverHandler {...triggers}>
              <IconButton
                size="sm"
                className="rounded text-white hover:bg-green-500 h-6 w-6 cursor-pointer"
              >
                <PlusIcon className="h-4 w-4" />
              </IconButton>
            </PopoverHandler>
            <PopoverContent {...triggers} className="z-50 max-w-[26rem]">
              <Textarea
                data-testid="categoryInput"
                onChange={(e) => setInputValue(e.target.value)}
                label="Category"
              />{" "}
              <Button size="sm" data-testid="addCategory" onClick={addCategory}>
                <span>Add Category</span>
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-wrap gap-2 divide-t">
          <div
            className={`flex gap-1 items-center rounded cursor-pointer uppercase px-3 py-1 ${
              category === "All"
                ? "bg-dark text-white"
                : "bg-gray-900/10 text-gray-900"
            } `}
            onClick={() => setCategory("All")}
          >
            <div className="text-sm">All Category</div>
          </div>
          {categories.map((cat) => (
            <div
              className={`flex gap-2 items-center rounded cursor-pointer uppercase px-3 py-1 ${
                category === cat
                  ? "bg-dark text-white"
                  : "bg-gray-900/10 text-gray-900"
              } `}
              onClick={() => setCategory(cat)}
              key={cat}
            >
              <div className="text-sm">{cat}</div>

              <Popover
                open={warnPopover === cat}
                handler={() => setWarnPopover(cat)}
              >
                <PopoverHandler>
                  <div className="w-fit">
                    <TrashIcon className="h-4 w-4" />
                  </div>
                </PopoverHandler>
                <PopoverContent className="z-50 max-w-[12rem]">
                  <div className="whitespace-wrap flex flex-col items-center gap-1">
                    <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                    Are you sure you want to delete this category?
                    <div className="text-justify bg-red-900/10 p-1 rounded text-red-900">
                      Note: if you delete a category you will also delete todo
                      that are related to that category!!{" "}
                    </div>
                  </div>
                  <div className="flex gap-1 items-center border-t mt-3 pt-2 justify-end">
                    <IconButton
                      title="Cancel"
                      size="sm"
                      variant="text"
                      data-testid="cancelRemove"
                      onClick={() => setWarnPopover("")}
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </IconButton>

                    <IconButton
                      title="Confirm"
                      size="sm"
                      data-testid="okRemove"
                      onClick={() => removeCategory(cat)}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </IconButton>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default CategoryList;
