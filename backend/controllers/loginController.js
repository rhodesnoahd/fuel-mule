const UserCredentials = require("../models/UserCredentials");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const ClientInformation = require("../models/ClientInformation");

// @desc Login a user
// @route POST /login
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // confirm data
  if (!username || !password) {
    // HTTP status 400 = bad request
    return res.status(400).json({ message: "All fields are required" });
  }

  // check username
  const user = await UserCredentials.findOne({ username }).lean().exec();
  if (!user) {
    // HTTP status 400 = bad request
    return res.status(400).json({ message: "User not found" });
  }

  // check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // HTTP status 401 = unauthorized
    res.status(401).json({ message: "Invalid password" });
  } else {
    // query client information
    const id = user._id;
    const profile = await ClientInformation.findOne({ user_credentials: id })
      .lean()
      .exec();
    // HTTP status 200 = OK
    res
      .status(200)
      .json({
        message: `User ${user.username} logged in`,
        // userId: id,
        _user_id: user._id,  
        _user_name: user.username,
        _client_schema: profile,
      });
  }
});

module.exports = { loginUser };
