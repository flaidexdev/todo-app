import React from "react";

import { Button } from "@material-tailwind/react";

function App() {
  return (
    <>
      <header className="bg-primary min-h-[74px] flex items-center justify-center w-full">
        <h1 className="text-xl font-bold text-white">Todo App</h1>
      </header>
      <div className="container">
        
        <Button>New</Button>
      </div>
    </>
  );
}

export default App;
