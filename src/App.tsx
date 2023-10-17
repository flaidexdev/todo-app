import React from "react";

import TodoDashboard from "./components/TodoDashboard";

function App() {
  return (
    <div className="flex flex-col">
      <header className="z-[100] bg-white shadow-md min-h-[74px] flex items-center justify-center w-full fixed top-0 left-0">
        <h1 data-testid="todo-app-header" className="text-xl font-bold">Todo App</h1>
      </header>
      <div className="container mt-[120px] md:mt-[150px]">
        <TodoDashboard />
      </div>
    </div>
  );
}

export default App;
