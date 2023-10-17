import { useState } from "react";
import type { FC } from "react";

import { toast } from "react-toastify";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";

import { PlusIcon } from "@heroicons/react/24/outline";

import { Category } from "../../types";

interface AddCategoryProps {
  categories: Category[];
  setCategories: (category: (prevCategories: Category[]) => Category[]) => void;
}

const AddCategory: FC<AddCategoryProps> = ({ categories, setCategories }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [openPopover, setOpenPopover] = useState<boolean>(false);

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

  return (
    <Popover placement="top-end" open={openPopover} handler={setOpenPopover}>
      <PopoverHandler>
        <IconButton
          size="sm"
          className="rounded hover:bg-green-500 hover:text-white h-6 w-6 cursor-pointer"
        >
          <PlusIcon className="h-4 w-4" />
        </IconButton>
      </PopoverHandler>
      <PopoverContent className="z-[100] flex flex-col gap-2 max-w-[26rem]">
        <Input
          data-testid="categoryInput"
          onChange={(e) => setInputValue(e.target.value)}
          label="Category"  
          crossOrigin="anonymous" 
        />
        <Button size="sm" data-testid="addCategory" onClick={addCategory}>
          Add Category
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default AddCategory;
