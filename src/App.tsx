import React from "react";

import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="flex flex-col">
      <header className="z-[100] bg-white shadow-md min-h-[74px] flex items-center justify-center w-full fixed top-0 left-0">
        <h1 className="text-xl font-bold">Todo App</h1>
      </header>
      <div className="container mt-[120px] md:mt-[150px]">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
