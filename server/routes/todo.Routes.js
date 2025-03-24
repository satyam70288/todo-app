const {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    getAllUsersWithTodos,
    toggleStatus,
  } = require("../controllers/todo.controller");
  
  const auth = require("../middlewares/auth");
  
  const todoRouter = require("express").Router();
  
  // User Routes (Only Authenticated Users)
  todoRouter.post("/create", auth("createTodo"), createTodo);
  todoRouter.get("/", auth("getTodos"), getAllTodos);
  todoRouter.get("/:id", auth("getTodos"), getTodoById);
  todoRouter.put("/:id", auth("updateTodo"), updateTodo);
  todoRouter.delete("/:id", auth("deleteTodo"), deleteTodo);
  todoRouter.patch("/:id", auth(), toggleStatus);

  // Admin Route: Fetch all users with their todos
  todoRouter.get("/admin/all-users-todos", auth("getAllTodos", "manageUsers"), getAllUsersWithTodos);
  
  module.exports = todoRouter;
  