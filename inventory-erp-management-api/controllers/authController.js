import db from "../utils/db.js";
import bcrypt from 'bcryptjs';   // Make sure to import bcrypt
import jwt from 'jsonwebtoken';

const register = async (req, reply) => {
  const { username, password, role } = req.body;

  // Check if the user already exists
  const existingUser = await db('users').where({ username }).first();
  if (existingUser) return reply.send({ message: "Username exists" });

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  const [newUser] = await db('users')
    .insert({ username, password: hashedPassword, role })
    .returning('*');

  return reply.send(newUser);
};

const login = async (req, reply) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) return reply.send({ error: "Username or password field required!" });

  // Find the user in the database
  const user = await db('users').where({ username }).first();
  if (!user) return reply.send({ error: "User not found!" });

  // Compare the password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return reply.send({ error: "Credentials do not match!" });

  // Generate a JWT token
  const generatedToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_TOKEN,  // Use a secure secret for the token
    { expiresIn: '2h' }
  );

  return reply.send({ token: generatedToken });
};

export { login, register };
