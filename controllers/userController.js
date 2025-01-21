const { User } = require("../models/User");

// Create a new User
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Get a specific User by ID
const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  user
    ? res.json(user)
    : res.status(404).json({
        error: "User not found",
      });
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({
        error: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Delete a User
const deleteUser = async (req, res) => {
  const result = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  result
    ? res.status(204).send()
    : res.status(404).json({
        error: "User not found",
      });
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
