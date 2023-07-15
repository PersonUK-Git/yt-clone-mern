import express from "express";
import { singin, singup } from "../controllers/auth.js"

const router = express.Router()

//CREATE A USER

router.post("/signup", singup)
//SIGN IN 
router.post("/signin", singin)
//GOOGLE AUTH
router.post("/google")
export default router  