import express from "express";

import { encode } from '../middleware/jwt.js';
const router = express.Router();

router
    .post('/login/:userId', encode, (req, res, next) => { });

export default router;