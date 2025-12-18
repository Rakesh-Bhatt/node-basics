const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const User = require('../models/User');

// method to handle user signup without database
exports.signupWithoutDB = async (req, res) => {
    const { name, country, email, password } = req.body;

    if (!name || !country || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const existingUser = userService.findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({
            message: "User with this email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userService.addNewUser({ name, country, email, password: hashedPassword });

    res.status(201).json({
        message: "Signup successful",
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, country } = req.body;

    if (!name || !email || !password || !country) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      country
    });

    res.status(201).json({
      message: 'Signup successful',
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    next(err);
  }
};

// method to handle user login
exports.loginWithoutDB = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = userService.findUserByEmail(email);

    if (!existingUser) {
        return res.status(404).json({
            message: "User with this email does not exists"
        });
    }

    const matchUserDetail = await bcrypt.compare(password, existingUser.password)

    if (!matchUserDetail) {
        return res.status(401).json({
            message: "Email or password does not match, please try again!!"
        })
    }

    const token = jwt.sign({
        id: existingUser.id,
        email: existingUser.email,
    }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
        message: "Login Successful",
        token: token
    })
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Sign JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    next(err);
  }
};
