import React from "react";

import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="flex flex-col items-center justify-center py-[80px] h-full relative">
      <header className="bg-white shadow-md min-h-[74px] flex items-center justify-center w-full fixed top-0 left-0">
        <h1 className="text-xl font-bold">Todo App</h1>
      </header>
      <div className="container">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
