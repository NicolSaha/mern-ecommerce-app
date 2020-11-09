import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@DESCR  FETCH ALL PRODUCTS
//@ROUTE  GET /API/PRODUCTS
//@ACCESS PUBLIC
const getProducts = asyncHandler(async (request, response) => {
  const pageSize = 8;
  const page = Number(request.query.pageNumber) || 1;
  const keyword = request.query.keyword
    ? {
        name: {
          $regex: request.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  response.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@DESCR  FETCH A SINGLE PRODUCTS
//@ROUTE  GET /API/PRODUCTS/:ID
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

// @DESCR   Delete a product
// @ROUTE   DELETE /api/products/:id
// @ACCESS  Private/Admin
const deleteProduct = asyncHandler(async (request, response) => {
  const product = await Product.findById(request.params.id);

  if (product) {
    await product.remove();
    response.json({ message: 'Product removed' });
  } else {
    response.status(404);
    throw new Error('Product not found');
  }
});

// @DESCR   Create a product
// @ROUTE   POST /api/products
// @ACCESS  Private/Admin
const createProduct = asyncHandler(async (request, response) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: request.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  response.status(201).json(createdProduct);
});

// @DESCR   Update a product
// @ROUTE   PUT /api/products/:id
// @ACCESS  Private/Admin
const updateProduct = asyncHandler(async (request, response) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = request.body;

  const product = await Product.findById(request.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    response.json(updatedProduct);
  } else {
    response.status(404);
    throw new Error('Product not found');
  }
});

// @DESCR   Create new review
// @ROUTE   POST /api/products/:id/reviews
// @ACCESS  Private
const createProductReview = asyncHandler(async (request, response) => {
  const { rating, comment } = request.body;

  const product = await Product.findById(request.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === request.user._id.toString()
    );

    if (alreadyReviewed) {
      response.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: request.user.name,
      rating: Number(rating),
      comment,
      user: request.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    response.status(201).json({ message: 'Review added' });
  } else {
    response.status(404);
    throw new Error('Product not found');
  }
});

// @DESCR   Get top rated products
// @ROUTE   GET /api/products/top
// @ACCESS  Public
const getTopProducts = asyncHandler(async (request, response) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  response.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
