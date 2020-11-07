import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderbyId,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authenticationMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderbyId);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/myorders').get(protect, getMyOrders);

export default router;
