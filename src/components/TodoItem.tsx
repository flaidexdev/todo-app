import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  setTodoData: (todoData: (prevTodoData: Todo[]) => Todo[]) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, setTodoData }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(todo.content);
  };

  const toggleDone = (id: number) => {
    setTodoData((prevTodoData) =>
      prevTodoData.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodoData((prevTodoData) => prevTodoData.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex justify-between items-center p-4 border-b bg-dark">
      <div>
        <h3 className="font-bold">{todo.content}</h3>
        <p>{todo.category}</p>
      </div>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleDone(todo.id)}
      />
      <button onClick={copyToClipboard}>Copy</button>
      <button onClick={() => removeTodo(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
