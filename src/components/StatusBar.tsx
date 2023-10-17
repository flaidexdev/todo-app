import type { FC } from "react";

import { Typography } from "@material-tailwind/react";

import { Todo } from "../types";

import StatusCard from "./card/Status";

interface StatusBarProps {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  todoData: Todo[];
}

const StatusBar: FC<StatusBarProps> = ({
  status,
  setStatus,
  todoData,
}) => {
  const allStatus = ["Completed", "Uncompleted"];


  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <Typography>Status</Typography>
      </div>

      <div className="flex flex-col gap-4">
        <StatusCard
          data={"Total"}
          todoData={todoData}
          status={status}
          setStatus={setStatus}
        />
        {allStatus.map((stat) => (
          <StatusCard
            key={stat}
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
