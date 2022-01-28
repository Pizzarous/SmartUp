import express from "express";
import { authUser, registerUser } from "../controllers/userControllers.js";
// import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router()

// Create a Route, API endpoint 
router.post('/', registerUser)
router.post('/login', authUser)

export { router };