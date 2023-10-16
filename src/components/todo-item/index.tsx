import { Todo } from "../../types";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(todo.content);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b bg-dark">
      <div>
        <h3 className="font-bold">{todo.content}</h3>
        <p>{todo.category}</p>
      </div>

      <button onClick={copyToClipboard}>Copy</button>
    </div>
  );
};

export default TodoItem;
