import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users and their todos
  useEffect(() => {
    const fetchUsersAndTodos = async () => {
      try {
        const userResponse = await axios.get("https://api.example.com/users"); // Replace with actual API
        const todoResponse = await axios.get("https://api.example.com/todos");

        const usersWithTodos = userResponse.data.map((user) => ({
          ...user,
          todos: todoResponse.data.filter((todo) => todo.userId === user.id),
        }));

        setUsers(usersWithTodos);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        toast.error("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Admin Dashboard</h2>
      {loading ? (
        <p className="text-center text-gray-300">Loading users and todos...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-2">User ID</th>
                <th className="border border-gray-700 px-4 py-2">Name</th>
                <th className="border border-gray-700 px-4 py-2">Email</th>
                <th className="border border-gray-700 px-4 py-2">Todos</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center bg-gray-700 hover:bg-gray-600">
                  <td className="border border-gray-700 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-700 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-700 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-700 px-4 py-2 text-left">
                    <ul className="list-disc ml-4">
                      {user.todos.length > 0 ? (
                        user.todos.map((todo) => (
                          <li key={todo.id} className={todo.completed ? "text-green-400" : "text-red-400"}>
                            {todo.title} {todo.completed ? "(Completed)" : "(Pending)"}
                          </li>
                        ))
                      ) : (
                        <span className="text-gray-400">No todos</span>
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
