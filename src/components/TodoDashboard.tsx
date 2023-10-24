import React, { useState, useEffect } from "react";

import { Todo, Category } from "../types";

import TodoList from "./todo/TodoList";
import Sidebar from "./Sidebar";

const TodoDashboard: React.FC = () => {
  const [menu, setMenu] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Total");
  const [category, setCategory] = useState<Category>("All");
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

  useEffect(() => {
    if (category !== "") {
      setFilteredTodoData((prevFilteredTodoData) =>
        todoData.filter((todo) => {
          return status === "Total"
            ? category === "All"
              ? todo
              : todo.category.toLowerCase() === category.toLowerCase()
            : category === "All"
            ? status === "Completed"
              ? todo.done
              : status === "Uncompleted" && !todo.done
            : (status === "Completed"
                ? todo.done
                : status === "Uncompleted" && !todo.done) &&
              todo.category.toLowerCase() === category.toLowerCase();
        })
      );
    } else {
      setFilteredTodoData(() => todoData);
    }
  }, [status, category, todoData, setFilteredTodoData]);

  return (
    <div data-testid="todo-dashboard" className="grid grid-cols-12 gap-4">
      {menu && (
        <div
          data-testid="menu-overlay"
          onClick={() => setMenu(false)}
          className="z-[100] fixed top-0 left-0 w-full h-full bg-dark/20"
        ></div>
      )}
      <div className="col-span-12 md:col-span-4 lg:col-span-3">
        <Sidebar
          status={status}
          setStatus={setStatus}
          menu={menu}
          setMenu={setMenu}
          categories={categories}
          setCategories={setCategories}
          todoData={todoData}
          setTodoData={setTodoData}
          category={category}
          setCategory={setCategory}
        />
      </div>
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        <TodoList
          setMenu={setMenu}
          categories={categories}
          todoData={todoData}
          setTodoData={setTodoData}
          filteredTodoData={filteredTodoData}
          setFilteredTodoData={setFilteredTodoData}
        />
      </div>
    </div>
  );
};

export default TodoDashboard;
