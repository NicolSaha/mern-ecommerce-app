import express from 'express';
const router = express.Router();
import { authenticateUser } from '../controllers/userController.js';

router.post('/login', authenticateUser);

export default router;
