import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//@DESCRIPTION Authenticate user, get token
//@ROUTE POST /api/users/login
//@ACCESS Public
const authenticateUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    response.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    response.status(401);
    throw new Error('Invalid email or password');
  }
});

//@DESCRIPTION Register new user
//@ROUTE POST /api/users
//@ACCESS Public
const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    response.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    response.status(400);
    throw new Error('Invalid user data');
  }
});

//@DESCRIPTION Get user profile
//@ROUTE GET /api/users/profile
//@ACCESS Private
const getUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    response.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    response.status(404);
    throw new Error('User not found');
  }
});

export { authenticateUser, registerUser, getUserProfile };
