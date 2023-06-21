import express from 'express';
import user from '../controllers/user.js';

const router = express.Router();

router
    .post("/gotp", user.generateOtp)
    .post("/verifyotp", user.verifyOtp)
    .post("/", user.onCreateuser)
    .post("/setavatar", user.setAvatar)
    .post("/login", user.onLoginuser)
    .post("/startchat", user.addChat)
    .post("/getchats", user.getUsersWithChat)
    .get("/:id", user.onGetuserById)
    .get("/all/:id", user.onGetAllusers)
    .delete("/:id", user.onDeleteUserById)


export default router;