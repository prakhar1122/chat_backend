import express from 'express';
import chatroom from '../controllers/chatroom.js';

const router = express.Router();

router
    .post("/create", chatroom.initiate)
    .post("/:roomId/message", chatroom.postMessage)
    .get("/", chatroom.gotRecentConversation)
    .get("/:roomId", chatroom.gotConversationByRoomId)
    .put("/", chatroom.markConversationReadByRoomId)

export default router;
