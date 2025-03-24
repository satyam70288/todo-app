import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/todo";

// Function to get auth token from localStorage
const getToken = () => {
  const storedUser = JSON.parse(localStorage.getItem("todoapp"));
  return storedUser?.data?.token || null;
};

// Set token in Axios headers
const setAuthHeader = () => {
  const token = getToken();
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  }
};

// Fetch all todos
export const fetchTodos = async () => {
  try {
    setAuthHeader();
    const response = await axios.get(API_URL);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching todos:", error.response?.data || error.message);
    return [];
  }
};

// Add a new todo
export const addTodo = async (title) => {
  try {
    setAuthHeader();
    const response = await axios.post(`${API_URL}/create`, { title, status: "pending" });
    return response.data.data;
  } catch (error) {
    console.error("Error adding todo:", error.response?.data || error.message);
    return null;
  }
};

// Toggle todo status
export const toggleComplete = async (id, status) => {
  try {
    setAuthHeader();
    const newStatus = status === "pending" ? "completed" : "pending";
    await axios.patch(`${API_URL}/${id}`, { status: newStatus });

    return newStatus; // Return the new status
  } catch (error) {
    console.error("Error updating todo:", error.response?.data || error.message);
    return status; // Return the old status if error
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    setAuthHeader();
    await axios.delete(`${API_URL}/${id}`);
    return true; // Return success
  } catch (error) {
    console.error("Error deleting todo:", error.response?.data || error.message);
    return false;
  }
};
