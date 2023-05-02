const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.route("/")
  // HTTP method                    // CRUD operation
  // .get(loginController.loginUser)// read, JSX doesn't allow GET requests in body
  .post(loginController.loginUser)  // create, login

module.exports = router;