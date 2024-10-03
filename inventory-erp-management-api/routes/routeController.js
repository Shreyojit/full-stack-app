import { login, register } from "../controllers/authController.js";

// Define a plugin to register routes
async function authRoutes(fastify, options) {
  fastify.post('/register', register);  // Register route for /register
  fastify.post('/login', login);        // Register route for /login
}

export default authRoutes;
