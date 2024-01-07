const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

class AuthController {
  registerUser = async (req, res) => {
    const { name, email, password } = req?.body;
    if(!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details"
      });
    }

    try {
      const isUserExitsWithEmail = await User.findOne({ email }).select('+password');
      if(isUserExitsWithEmail) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email"
        });
      }

      const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
      const token = await jwt.sign({
        name: user.name,
        email: user.email,
        _id: user._id
      }, 'username', {
        expiresIn: '2d'
      }); ////TODO: will get it from env file

      return res.status(201).json({ success: true, message: "User created successfully", token });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }

  loginUser = async (req, res) => {
    const { email, password } = req?.body;
    if(!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details"
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if(!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password"
      });
    }

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: await jwt.sign({
        email: user.email,
        _id: user._id
      }, 'username', {
        expiresIn: '2d'
      })
    });
  }
}

module.exports = new AuthController();