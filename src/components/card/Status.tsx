import type { FC } from "react";

import { Badge } from "@material-tailwind/react";

import { Todo } from "../../types";

interface StatusCardProps {
  data: string;
  todoData: Todo[];
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const StatusCard: FC<StatusCardProps> = ({
  data,
  todoData,
  status,
  setStatus,
}) => {
  return (
    <Badge
      content={
        data === "Total"
          ? todoData.length
          : todoData.filter((todo) =>
              data === "Completed" ? todo.done : !todo.done
            ).length
      }
      withBorder
      color={status === data ? "green" : "gray"}
    >
      <div
        className={`w-full flex gap-2 items-center rounded cursor-pointer uppercase px-3 py-2 ${
          status === data
            ? "bg-green-500 text-white"
            : "bg-gray-900/10 text-gray-900"
        } `}
        onClick={() => setStatus(data)}
      >
        <div className="text-xs">{data}</div>
      </div>
    </Badge>
  );
};

export default StatusCard;
