import express from "express";
import { register, log_in, forgot_password_handler, reset_password_handler } from "../controller/auth.controller.js";

const router = express.Router();

// all public: a guest must be able to reach them without a token
router.post("/register", register);
router.post("/login", log_in);
router.post("/forgot-password", forgot_password_handler);
router.patch("/reset-password/:token", reset_password_handler);

export default router;
