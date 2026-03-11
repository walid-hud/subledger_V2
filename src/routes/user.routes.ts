import { Router } from "express";
import { authenticate , authorize , hasToken } from "../middleware/auth.js";

const router = Router()

router.get("/profile", hasToken, authenticate ,(req, res)=>{
    return res.json(req.user)
})

export default router