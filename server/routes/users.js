import express from "express";
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from "../controllers/user.js";


const router = express.Router()

// UPDATE USER
router.put("/:id", update)
// DELETE USER
router.delete(":/id", deleteUser)
// GET USER
router.get("/find/:id", getUser)
//SUBSCRIBE A USER
router.put("/sub/:id", subscribe)
// UNSUBSCRIBE A USER
router.put("/unsub/:id", unsubscribe)
//LIKE A VIDEO
router.put("/like/:videoId", like) 
//DISLIKE A VIDEO
router.put("/dislike/videoId", dislike)
export default router; 