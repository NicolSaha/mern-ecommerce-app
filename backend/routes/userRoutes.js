import express from 'express';
const router = express.Router();
import {
  authenticateUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authenticationMiddleware.js';

router.post('/login', authenticateUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
