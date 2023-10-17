import {  useEffect } from "react";
import type { FC } from "react";

import { Typography } from "@material-tailwind/react";

import { Todo } from "../types";

import StatusCard from "./card/Status";

interface StatusBarProps {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  todoData: Todo[];
  setFilteredTodoData: (
    todoData: (prevFilteredTodoData: Todo[]) => Todo[]
  ) => void;
}

const StatusBar: FC<StatusBarProps> = ({
  status,
  setStatus,
  todoData,
  setFilteredTodoData,
}) => {
  const allStatus = ["Completed", "Uncompleted"];

  useEffect(() => {
    if (status !== "" && status !== "Total") {
      setFilteredTodoData((prevFilteredTodoData) =>
        prevFilteredTodoData.filter((todo) =>
          status === "Completed" ? todo.done : !todo.done
        )
      );
    } else {
      setFilteredTodoData(() => todoData);
    }
  }, [status, todoData, setFilteredTodoData]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <Typography>Status</Typography>
      </div>

      <div className="flex flex-col gap-2 divide-t">
        <StatusCard
          data={"Total"}
          todoData={todoData}
          status={status}
          setStatus={setStatus}
        />
        {allStatus.map((stat) => (
          <StatusCard
            data={stat}
            todoData={todoData}
            status={status}
            setStatus={setStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusBar;
