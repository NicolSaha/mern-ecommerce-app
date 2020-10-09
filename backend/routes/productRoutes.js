import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';

//@DESCRIPTION FETCH ALL PRODUCTS
//@ROUTE GET /API/PRODUCTS
//@ACCESS PUBLIC
router.get(
  '/',
  asyncHandler(async (request, response) => {
    const products = await Product.find({});
    response.json(products);
  })
);

//@DESCRIPTION FETCH A SINGLE PRODUCTS
//@ROUTE GET /API/PRODUCTS/:ID
//@ACCESS PUBLIC
router.get(
  '/:id',
  asyncHandler(async (request, response) => {
    const product = await Product.findById(request.params.id);

    if (product) {
      response.json(product);
    } else {
      response.status(404).json({ message: 'Product not found' });
    }
  })
);

export default router;
