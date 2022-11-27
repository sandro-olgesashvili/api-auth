const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userCheck = await User.findOne({ email });

  if (userCheck) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPasswrod = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPasswrod,
  });

  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      _id: user._id,
      token: jwtgen(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Data");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      _id: user.id,
      token: jwtgen(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
};

function jwtgen(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

module.exports = { register, login };
