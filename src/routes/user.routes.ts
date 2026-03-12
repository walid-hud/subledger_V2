import { Router } from "express";
import { authenticate , authorize , hasToken } from "../middleware/auth.js";
import subscriptionController from "../controllers/subscription.controller.js";
const router = Router()
router.use(hasToken, authenticate)
router.get("/profile" , subscriptionController.getProfile)
export default router