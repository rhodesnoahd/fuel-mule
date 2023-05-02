const UserCredentials = require("../models/UserCredentials");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Create new user
// @route POST /register
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // confirm data
    if (!username || !password) {
        // HTTP status 400 = bad request
        return res.status(400).json({ message: "All fields are required" });
    }

    // check duplicates
    const duplicate = await UserCredentials.findOne({ username }).lean().exec();
    if (duplicate) {
        // HTTP status 409 = conflict
        return res.status(409).json({ message: "Duplicate username" });
    }

    // hash password
    const hashedPwd = await bcrypt.hash(password, 10); // 10 salt rounds
    const userObject = { username, password: hashedPwd };

    // create and store new user
    const user = await UserCredentials.create(userObject);
    if (user) {
        // HTTP status 201 = created
        res.status(201).json({ message: `New user ${username} created` });
    } else {
        // HTTP status 400 = bad request
        res.status(400).json({ message: "Invalid user data received" });
    }
});

module.exports = { createNewUser };
