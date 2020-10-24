import express from 'express';
const router = express.Router();
import {
  authenticateUser,
  registerUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authenticationMiddleware.js';

router.route('/').post(registerUser);
router.post('/login', authenticateUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
