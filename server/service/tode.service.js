const Todo = require("../models/todo.model");

module.exports = {
    // Create a new todo
    create: async (todoData) => {
        return await Todo.create(todoData);
    },

    // Get all todos
    getAll: async (userId) => {
        return await Todo.find({});
    },
    toggleStatus: async (id,status) => {
        if (!["pending", "completed"].includes(status)) {
            throw new Error("Invalid status value. Allowed values: 'pending', 'completed'");
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true } // Returns updated document & validates status
        );

        if (!updatedTodo) {
            throw new Error("Todo not found");
        }

        return updatedTodo;
    },
    // Get todo by ID
    getById: async (id) => {
        return await Todo.findById(id);
    },

    // Update todo
    update: async (id, updateData) => {
        return await Todo.findByIdAndUpdate(id, updateData, { new: true });
    },

    // Delete todo
    delete: async (id) => {
        return await Todo.findByIdAndDelete(id);
    },

    getAllUsersWithTodos: async () => {
        return await User.find().select("username email").populate("todos");
    }
};
