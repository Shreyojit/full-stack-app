import express from "express";
import { deleteUser, updateProfile } from "../controllers/UserController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/updateProfile/:id",verifyUser,updateProfile )
router.post("/deleteUser/:id", deleteUser)

export default router


