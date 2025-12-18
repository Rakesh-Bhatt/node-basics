const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const JWT_SECRET = "super-secret-key-123";

// method to handle user signup
exports.signup = async (req, res) => {
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

// method to handle user login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = userService.findUserByEmail(email);

    if (!existingUser) {
        return res.status(404).json({
            message: "User with this email does not exists"
        });
    }

    const matchUserDetail = await bcrypt.compare(password, existingUser.password)

    if(!matchUserDetail) {
        return res.status(401).json({
            message: "Email or password does not match, please try again!!"
        })
    }

    const token = jwt.sign({
        id: existingUser.id,
        email: existingUser.email,
    }, JWT_SECRET, {expiresIn: "1h"});

    return res.status(200).json({
        message: "Login Successful",
        token: token
    })
};
