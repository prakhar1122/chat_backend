import express from 'express';
import _delete from '../controllers/delete.js';
const router = express.Router();

router
    .delete("/room/:id", _delete.deleteRoomById)
    .delete("/message/:id", _delete.deleteRoomById)

export default router;