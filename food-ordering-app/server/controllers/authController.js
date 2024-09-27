import User from "../models/User.js"
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";


export const register = async(req,res,next) => {
    try{
     const salt = bcrypt.genSaltSync(10)
     const hashedPassword = bcrypt.hashSync(req.body.password,salt)

     const newUser = new User({
        ...req.body,
        password:hashedPassword
     });
     await newUser.save()
     res.status(200).send("User has been created..")
    }catch(err){
      next(err)
    }
};

export const login = async (req, res, next) => {
    try {
      // Access username and password from request body
      const { username, password } = req.body;
  
      // Check if username and password are provided
      if (!username || !password) {
        return next(createError(400, "Username and password are required!"));
      }
  
      // Find the user in the database
      const user = await User.findOne({ username: username });
      if (!user) return next(createError(404, "User not found!"));
  
      // Compare the provided password with the stored hashed password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },  // Include user role in the token
        process.env.JWT_TOKEN,              // Make sure this is correctly set in your environment
        { expiresIn: '1h' }                 // Optional: set token expiration
      );
  
      const { password: userPassword, ...otherDetails } = user._doc; // Exclude password from the response
  
      // Set the token as a cookie and respond with user details and token
      res
        .cookie("access_token", token, { httpOnly: true })  // Set cookie for the token
        .status(200)
        .json({ user: { ...otherDetails }, token });  // Send the token back in the response
    } catch (err) {
      next(err);  // Pass the error to the error handling middleware
    }
  };

