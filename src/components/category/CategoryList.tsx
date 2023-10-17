import type { FC } from "react";

import { Typography } from "@material-tailwind/react";

import { Todo, Category } from "../../types";

import CategoryCard from "../card/Category";
import AddCategory from "./AddCategory";

interface CategoryListProps {
  categories: Category[];
  setCategories: (category: (prevCategories: Category[]) => Category[]) => void;
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  todoData: Todo[];
  setTodoData: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const CategoryList: FC<CategoryListProps> = ({
  category,
  setCategory,
  categories,
  setCategories,
  todoData,
  setTodoData,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-2">
        <Typography>Category</Typography>
        <AddCategory categories={categories} setCategories={setCategories} />
      </div>

      <div className="grid grid-cols-1 gap-4 divide-t">
        <CategoryCard
          data={"All"}
          setCategories={setCategories}
          todoData={todoData}
          setTodoData={setTodoData}
          category={category}
          setCategory={setCategory}
        />
        {categories.map((cat) => (
          <CategoryCard
            key={cat}
            data={cat}
            setCategories={setCategories}
            todoData={todoData}
            setTodoData={setTodoData}
            category={category}
            setCategory={setCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
