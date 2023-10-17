import React from "react";
import type { FC } from "react";

import {
  Card,
  CardBody,
  Drawer,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import { Todo, Category } from "../types";

import { XMarkIcon } from "@heroicons/react/24/outline";

import CategoryList from "./category/CategoryList";
import StatusBar from "./StatusBar";

interface SidebarProps {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  setCategories: (category: (prevCategories: Category[]) => Category[]) => void;
  todoData: Todo[];
  setTodoData: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Sidebar: FC<SidebarProps> = ({
  status,
  setStatus,
  menu,
  setMenu,
  categories,
  setCategories,
  category,
  setCategory,
  todoData,
  setTodoData,
}) => {
  return (
    <>
      <Card className="hidden md:block">
        <CardBody className="flex flex-col gap-4">
          <StatusBar
            setStatus={setStatus}
            status={status}
            todoData={todoData}
          />
          <CategoryList
            category={category}
            setCategory={setCategory}
            categories={categories}
            setCategories={setCategories}
            todoData={todoData}
            setTodoData={setTodoData}
          />
        </CardBody>
      </Card>

      <Drawer
        overlay={false}
        placement="right"
        className="z-[100]"
        open={menu}
        onClose={() => setMenu(false)}
      >
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Todo App
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setMenu(false)}
          >
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="flex flex-col gap-4 p-2">
          <div className="p-2">
            <StatusBar
              setStatus={setStatus}
              status={status}
              todoData={todoData}
            />
          </div>
          <div className="max-h-[382px] overflow-y-auto p-2">
            <CategoryList
              category={category}
              setCategory={setCategory}
              categories={categories}
              setCategories={setCategories}
              todoData={todoData}
              setTodoData={setTodoData}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
