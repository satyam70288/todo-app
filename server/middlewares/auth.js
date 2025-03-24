const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const ApiError = require("../utils/handler/ApiError.handler");
const roleRights = require("../config/roles"); // Ensure roleRights is correctly imported

const verifyCallback = (req, resolve, reject, requiredRights) => {
  // Extract token from Headers OR Cookies
  const token = req.header("x-auth-token") || req.cookies?.accessToken;

  if (!token) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
  }

  try {
    // Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to req

    // Check if user has required rights
	if (requiredRights.length) {
		const userRights = roleRights[req.user.role] || []; // Fix: Use object property access
		const hasRequiredRights = requiredRights.every((requiredRight) =>
			userRights.includes(requiredRight)
		);
		
	}


    resolve();
  } catch (error) {
    return reject(new ApiError(httpStatus.FORBIDDEN, error));
  }
};

// Middleware to protect routes
const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    new Promise((resolve, reject) => {
      verifyCallback(req, resolve, reject, requiredRights);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
