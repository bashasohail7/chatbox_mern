const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const userNameCheck = await user.findOne({ userName });
    const emailCheck = await user.findOne({ email });
    if (userNameCheck) {
      res
        .status(400)
        .json({ message: "UserName already used, please try with a new one" });
    }
    if (emailCheck) {
      res.status(400).json({ message: "User already exists, please login" });
    }
    //   else{
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      userName,
      email,
      password: hashedPassword,
    });
    delete newUser.password;
    console.log("user after deleting password  ======>  ", newUser);
    // }
    res.status(201).json({
      user: {
        userName: newUser.userName,
        email: newUser.email,
        _id: newUser._id,
      },
    });

    // };
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("email,", email);
    const foundUser = await user.findOne({ email });
    console.log("match searching ....", foundUser);

    if (!foundUser) {
      res.status(400).json({ message: "User not found with this email id" });
    }
    const ispasswordMatch = await bcrypt.compare(password, foundUser.password);
    //   else{
    if (ispasswordMatch) {
      const token = jwt.sign(
        { email: foundUser.email, id: foundUser._id },
        process.env.SECRET_KEY,
        // { expiresIn: 600 }
      );
      console.log("found user with matching password");
      delete foundUser.password;
      res.status(200).json({
        user: {
          userName: foundUser.userName,
          email: foundUser.email,
          _id: foundUser._id,
          token
        },
      });
    } else {
      res.status(401).json({ message: "credentials are not valid" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUserNames = async (req, res, next) => {
  const names = await user.find(null, { userName: true, _id: true });
  res.status(200).json({ names });
};
