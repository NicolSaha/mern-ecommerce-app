import express from 'express';
const router = express.Router();
import {
  authenticateUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authenticationMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authenticateUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
