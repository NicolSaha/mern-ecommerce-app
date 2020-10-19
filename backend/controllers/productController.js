import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@DESCRIPTION FETCH ALL PRODUCTS
//@ROUTE GET /API/PRODUCTS
//@ACCESS PUBLIC
const getProducts = asyncHandler(async (request, response) => {
  const products = await Product.find({});
  response.json(products);
});

//@DESCRIPTION FETCH A SINGLE PRODUCTS
//@ROUTE GET /API/PRODUCTS/:ID
//@ACCESS PUBLIC
const getProductById = asyncHandler(async (request, response) => {
  const product = await Product.findById(request.params.id);

  if (product) {
    response.json(product);
  } else {
    response.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById };
