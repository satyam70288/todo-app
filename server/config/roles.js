const allRoles = {
    user: ["createTodo", "getTodos", "updateTodo", "deleteTodo"],
    admin: ["getUsers", "manageUsers", "getAllTodos"],
  };
  
  const roles = Object.keys(allRoles);
  const roleRights = new Map(Object.entries(allRoles));
  
  module.exports = {
    roles,
    roleRights,
  };
  