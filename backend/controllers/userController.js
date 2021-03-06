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

//@DESCR Update user profile
//@ROUTE PUT /api/users/profile
//@ACCESS Private
const updateUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    user.name = request.body.name || user.name;
    user.email = request.body.email || user.email;
    if (request.body.password) {
      user.password = request.body.password;
    }

    const updatedUser = await user.save();

    response.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    response.status(404);
    throw new Error('User not found');
  }
});

// @DESC    Get all users
// @ROUTE   GET /api/users
// @ACCESS  Private/Admin
const getUsers = asyncHandler(async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (request, response) => {
  const user = await User.findById(request.params.id);

  if (user) {
    await user.remove();
    response.json({ message: 'User removed' });
  } else {
    response.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (request, response) => {
  const user = await User.findById(request.params.id).select('-password');

  if (user) {
    response.json(user);
  } else {
    response.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (request, response) => {
  const user = await User.findById(request.params.id);

  if (user) {
    user.name = request.body.name || user.name;
    user.email = request.body.email || user.email;
    user.isAdmin = request.body.isAdmin;

    const updatedUser = await user.save();

    response.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    response.status(404);
    throw new Error('User not found');
  }
});

export {
  authenticateUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
