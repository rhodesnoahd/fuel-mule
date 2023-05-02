const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

router.route("/")
  // HTTP method                          // CRUD operation
  .post(registerController.createNewUser) // create

module.exports = router;