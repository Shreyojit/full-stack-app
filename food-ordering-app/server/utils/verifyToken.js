import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];  // Fixed typo
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createError(401, "You are not authenticated!.."));
  }

  const token = authHeader.split(' ')[1];  // Correct token extraction logic

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {  // Fixed env variable reference
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();  // Proceed to the next middleware
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.role === 'admin') {
      next();  // Authorized user
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === 'admin') {
      next();  // Proceed if user is admin
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyRestaurantOwner = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === 'restaurant_owner') {
      next();  // Proceed if user is restaurant owner
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyDeliveryBoy = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === 'delivery_boy') {
      next();  // Proceed if user is delivery boy
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
