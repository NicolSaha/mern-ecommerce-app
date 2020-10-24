import express from 'express';
const router = express.Router();
import {
  authenticateUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authenticationMiddleware.js';

router.route('/').post(registerUser);
router.post('/login', authenticateUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
