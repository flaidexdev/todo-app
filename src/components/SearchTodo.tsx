import React, { useState, useEffect } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { Todo } from "../types";

interface SearchTodoProps {
  todoData: Todo[];
  setFilteredTodoData: (
    todoData: (prevFilteredTodoData: Todo[]) => Todo[]
  ) => void;
}

const SearchTodo: React.FC<SearchTodoProps> = ({
  todoData,
  setFilteredTodoData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm !== "") {
      setFilteredTodoData((prevFilteredTodoData) =>
        prevFilteredTodoData.filter((todo) =>
          todo.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredTodoData(() => todoData);
    }
  }, [searchTerm, todoData, setFilteredTodoData]);

  return (
    <div className="relative flex items-center justify-center">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="search"
        placeholder="Search Todo..."
        className="flex h-9 w-full rounded-md border border-input bg-transparent pl-6 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark disabled:cursor-not-allowed disabled:opacity-50"
      />
      <MagnifyingGlassIcon className="h-4 w-4 absolute left-1 top-3" />
    </div>
  );
};

export default SearchTodo;
