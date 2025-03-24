const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const ApiError = require("../utils/handler/ApiError.handler");

const registerUser = async (data) => {
  const { username, email, password } = data;

  if (!username || !email || !password) {
    throw new ApiError("Please provide all required fields");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new ApiError("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({ username, email, password: hashedPassword });

  return { message: "User registered successfully", user: newUser };
};

const loginUser = async (data, res) => {
    const { email, password } = data;
  
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new ApiError("Invalid Email or Password");
    }
  
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError("Invalid Credentials");
    }
  
    // Generate JWT Token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  
    // Set token in HTTP-only cookie
    res.cookie("accessToken", token, {
      httpOnly: true, // Prevents JavaScript access (XSS protection)
      secure: process.env.NODE_ENV === "production", // Only secure in production (HTTPS)
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
    });
  
    // Return both token and user in response
    return {
      message: "Login successful",
      token, // Send token in response body
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    };
  };
  
module.exports = { registerUser, loginUser };
