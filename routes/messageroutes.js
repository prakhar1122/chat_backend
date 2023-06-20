import express from 'express';
import msg from '../controllers/messagecontroller.js';

const router = express.Router();

router
    .post("/addmessage", msg.addMessage)
    .post("/getmessage", msg.getAllmessage);


export default router;