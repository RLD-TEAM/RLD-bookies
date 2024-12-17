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
  book
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

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res
      .status(200)
      .json({ message: "Login successful", user: { username: user.username } });
  } catch (error) {
    res
      .status(500)
      .json({ message: " Error during login", error: error.message });
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
};
