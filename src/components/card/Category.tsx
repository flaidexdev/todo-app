import { useState } from "react";
import type { FC } from "react";

import { toast } from "react-toastify";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  IconButton,
  Badge,
} from "@material-tailwind/react";

import {
  ExclamationCircleIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { Todo, Category } from "../../types";

interface CategoryCardProps {
  data: Category;
  setCategories: (category: (prevCategories: Category[]) => Category[]) => void;
  todoData: Todo[];
  category: Category;
  setTodoData: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;

}

const CategoryCard: FC<CategoryCardProps> = ({
  data,
  setCategories,
  todoData,
  setTodoData,
  category,
  setCategory,
}) => {
  const [warnPopover, setWarnPopover] = useState<string>("");

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

  return (
    <Badge
      content={
        data === "All"
          ? todoData.length
          : todoData.filter(
              (todo) => todo.category.toLowerCase() === data.toLowerCase()
            ).length
      }
      withBorder
      color={category === data ? "green" : "gray"}
    >
      <div
        className={`w-full grid grid-cols-12 gap-2 items-center rounded cursor-pointer uppercase px-3 py-2 ${
          category === data
            ? "bg-green-500 text-white"
            : "bg-gray-900/10 text-gray-900"
        } `}
        onClick={() => setCategory(data)}
      >
        <div className="text-xs col-span-10">
          {data === "All" ? "All Category" : data}
        </div>

        {data !== "All" && (
          <div className=" col-span-2">
            <Popover
              open={warnPopover === data}
              handler={() => setWarnPopover(data)}
              placement="top-end"
            >
              <PopoverHandler>
                <div className="w-fit">
                  <TrashIcon data-testid="trash-icon" className="h-4 w-4 hover:text-red-500" />
                </div>
              </PopoverHandler>
              <PopoverContent className="z-[100] max-w-[12rem]">
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
                    onClick={() => removeCategory(data)}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </IconButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </Badge>
  );
};

export default CategoryCard;
