const express = require("express")
const router = express.Router()
const profileManagementController = require("../controllers/profileManagementController")

// TODO PUT for updateClient

router
  .route("/")
  // HTTP method                                     // CRUD operation
  .post(profileManagementController.createNewClient) // create
  .put(profileManagementController.updateClient) // update

module.exports = router

// .get(profileController.getProfile)        // read
// .delete(profileController.deleteProfile); // delete
