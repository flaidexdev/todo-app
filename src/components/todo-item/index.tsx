import { Todo } from "../../types";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
}) => {

  return (
    <div className="flex justify-between items-center p-4 border-b bg-dark">
      <div>
        <h3 className="font-bold">{todo.title}</h3>
        <p>{todo.category}</p>
      </div>
     

    </div>
  );
};

export default TodoItem;
