import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Todo {
  id: number;
  text: string;
  done: boolean;
  createdAt: Date;
  category?: string;
}

const defaultTodos: Todo[] = [
  {
    id: 1,
    text: "📖 Read Chapter 1 and highlight key insights",
    done: false,
    createdAt: new Date(),
    category: "reading",
  },
  {
    id: 2,
    text: "🤔 Reflect on how the main concepts apply to your life",
    done: false,
    createdAt: new Date(),
    category: "reflection",
  },
  {
    id: 3,
    text: "✍️ Write down one action you'll take today based on the book",
    done: false,
    createdAt: new Date(),
    category: "action",
  },
  {
    id: 4,
    text: "🧘‍♀️ Practice mindfulness meditation for 10 minutes",
    done: false,
    createdAt: new Date(),
    category: "challenge",
  },
  {
    id: 5,
    text: "📝 Write down 3 things you're grateful for",
    done: false,
    createdAt: new Date(),
    category: "gratitude",
  },
];

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("bookGPT-todos");
    return saved ? JSON.parse(saved) : defaultTodos;
  });
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const navigate = useNavigate();

  // Persist todos to localStorage
  useEffect(() => {
    localStorage.setItem("bookGPT-todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id: number) => {
    setTodos((todos) =>
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTodo = (text: string) => {
    if (text.trim()) {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: text.trim(),
        done: false,
        createdAt: new Date(),
      };
      setTodos((prev) => [...prev, newTodoItem]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.done).length;
  const totalCount = todos.length;

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-white">
      <header className="w-full max-w-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-700">Your Tasks</h2>
          <button
            onClick={() => navigate("/chat")}
            className="text-green-600 hover:text-green-700 text-sm"
          >
            ← Back to Chat
          </button>
        </div>

        {/* Progress indicator */}
        <div className="bg-green-50 rounded-lg p-3 mb-4">
          <div className="flex justify-between text-sm text-green-700 mb-1">
            <span>Progress</span>
            <span>
              {completedCount}/{totalCount} completed
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  totalCount > 0 ? (completedCount / totalCount) * 100 : 0
                }%`,
              }}
            />
          </div>
        </div>

        {/* Add new todo */}
        <form
          className="flex gap-2 mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            addTodo(newTodo);
          }}
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 rounded-lg border border-green-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-green-700 transition"
          >
            Add
          </button>
        </form>

        {/* Filter buttons */}
        <div className="flex gap-2 mb-4">
          {(["all", "active", "completed"] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                filter === filterType
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <div className="w-full max-w-md space-y-2">
        {filteredTodos.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {filter === "all"
              ? "No tasks yet. Add your first task above!"
              : filter === "active"
              ? "No active tasks. Great job!"
              : "No completed tasks yet. Keep going!"}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between bg-green-50 rounded-lg px-4 py-3 shadow transition-all ${
                todo.done ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  className="accent-green-600 mr-3 h-5 w-5"
                />
                <span
                  className={`text-green-900 text-base ${
                    todo.done ? "line-through" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 ml-2 text-sm"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="mt-6 text-red-600 hover:text-red-700 text-sm underline"
        >
          Clear completed tasks
        </button>
      )}
    </div>
  );
};

export default TodoPage;
