import React, { useState, useEffect } from "react";
import { FaTrash, FaCheck, FaPlus } from "react-icons/fa";
import { fetchTodos, addTodo, toggleComplete, deleteTodo } from "../../Services/todoService";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos on mount
  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    loadTodos();
  }, []);

  // Handle adding a todo
  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    const todo = await addTodo(newTodo);
    if (todo) {
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  // Handle toggling todo status
  const handleToggleComplete = async (id, status) => {
    const newStatus = await toggleComplete(id, status);
    setTodos(
      todos.map((todo) => (todo._id === id ? { ...todo, status: newStatus } : todo))
    );
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (id) => {
    const success = await deleteTodo(id);
    if (success) {
      setTodos(todos.filter((todo) => todo._id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-semibold mb-6">📝 My Todo List</h2>

      {/* Input Field to Add Todos */}
      <div className="flex w-full max-w-lg mb-4">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="w-full p-2 rounded-l-md bg-gray-800 border-none text-white"
        />
        <button className="p-3 bg-green-600 rounded-r-md" onClick={handleAddTodo}>
          <FaPlus />
        </button>
      </div>

      {/* Todo List */}
      <div className="w-full max-w-lg bg-gray-800 p-4 rounded-lg shadow-lg">
        {todos.length === 0 ? (
          <p className="text-center text-gray-400">No todos available. Add a new one!</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li
                key={todo._id}
                className={`flex justify-between items-center bg-gray-700 p-3 mb-2 rounded-md ${
                  todo.status === "completed" ? "opacity-50 line-through" : ""
                }`}
              >
                <span>{todo.title}</span>
                <div className="flex gap-3">
                  <button
                    className={`p-2 rounded-full ${
                      todo.status === "completed" ? "bg-green-600" : "bg-blue-600"
                    }`}
                    onClick={() => handleToggleComplete(todo._id, todo.status)}
                  >
                    <FaCheck />
                  </button>

                  <button className="p-2 bg-red-600 rounded-full" onClick={() => handleDeleteTodo(todo._id)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;
