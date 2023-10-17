import React, { useState, useEffect } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { Todo } from "../../types";
import { Input } from "@material-tailwind/react";

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
      <Input
        size="md"
        data-testid="categoryInput"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        label="Search Todo"
        type="search"
        crossOrigin="anonymous"
        icon={<MagnifyingGlassIcon className="h-4 w-4" />}
      />
    </div>
  );
};

export default SearchTodo;
