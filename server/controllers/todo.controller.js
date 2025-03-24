const ApiResponse = require("../utils/handler/ApiResponse.handler");
const { AsyncHandler } = require("../utils/handler/Async.handler");
const TodoService = require("../service/tode.service");
const ApiError = require("../utils/handler/ApiError.handler"); // Import custom error handler

module.exports = {
  // Create a new todo (Only authenticated users)
  createTodo: AsyncHandler(async (req, res) => {
   
    
    const todo = await TodoService.create({ userId: req.user.id, ...req.body });
    res.status(201).json(new ApiResponse(201, todo, "Todo created successfully"));
  }),

  // Get all todos (Only the authenticated user can see their own todos)
  getAllTodos: AsyncHandler(async (req, res) => {
    const todos = await TodoService.getAll(req.user.id); // Fetch only user's todos
    res.status(200).json(new ApiResponse(200, todos, "Todos fetched successfully"));
  }),

  // Get a single todo by ID (Only the owner can access their todo)
  getTodoById: AsyncHandler(async (req, res) => {
    const todo = await TodoService.getById(req.params.id);
    if (!todo || todo.userId.toString() !== req.user.id) {
      throw new ApiError(403, "Forbidden: You don't have access to this todo");
    }
    res.status(200).json(new ApiResponse(200, todo, "Todo fetched successfully"));
  }),

  // Update a todo (Only the owner can update their todo)
  updateTodo: AsyncHandler(async (req, res) => {
    const updatedTodo = await TodoService.update(req.params.id, req.user.id, req.body);
    if (!updatedTodo) {
      throw new ApiError(403, "Forbidden: You can't update this todo");
    }

    res.status(200).json(new ApiResponse(200, updatedTodo, "Todo updated successfully"));
  }),

  toggleStatus:AsyncHandler(async(req,res)=>{
    const todo = await TodoService.toggleStatus(req.params.id,req.body.status);
     res.status(200).json(new ApiResponse(200, todo, "Todo status update successfully"));

  }),
  // Delete a todo (Only the owner can delete their todo)
  deleteTodo: AsyncHandler(async (req, res) => {
    const deletedTodo = await TodoService.delete(req.params.id, req.user.id);
    if (!deletedTodo) {
      throw new ApiError(403, "Forbidden: You can't delete this todo");
    }
    res.status(200).json(new ApiResponse(200, null, "Todo deleted successfully"));
  }),

  // Get all users with their todos (Only for admin)
  getAllUsersWithTodos: AsyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== "admin") {
      throw new ApiError(403, "Forbidden: Only admins can access this data");
    }
    const usersWithTodos = await TodoService.getAllUsersWithTodos();
    res.status(200).json(new ApiResponse(200, usersWithTodos, "All users with todos fetched successfully"));
  }),
};
