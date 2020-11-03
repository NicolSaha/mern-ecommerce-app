import express from 'express';
const router = express.Router();
import { addOrderItems } from '../controllers/orderController.js';
import { protect } from '../middleware/authenticationMiddleware.js';

router.route('/').post(protect, addOrderItems);

export default router;
