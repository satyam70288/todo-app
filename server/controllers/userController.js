const {AsyncHandler} = require("../utils/handler/Async.handler");
const ApiResponse = require("../utils/handler/ApiResponse.handler");
const AuthService = require("../service/user.service");

const registerController = AsyncHandler(async (req, res) => {
  const result = await AuthService.registerUser(req.body);
  res.status(201).json(new ApiResponse(201, result, "User registered successfully"));
});

const loginController = AsyncHandler(async (req, res) => {
  const result = await AuthService.loginUser(req.body, res); // ✅ Pass `res`
  res.status(200).json(new ApiResponse(200, result, "Login successful"));
});


module.exports = { registerController, loginController };
