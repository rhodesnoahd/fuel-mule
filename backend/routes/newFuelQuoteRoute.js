const express = require("express");
const router = express.Router();
const newFuelQuoteController = require("../controllers/newFuelQuoteController");

router
  .route("/")
  // HTTP method                                    // CRUD operation
  .post(newFuelQuoteController.createNewFuelQuote)  // create
  .put(newFuelQuoteController.getNewFuelQuote);     // read (doesn't store in db) PUT?
  // .get(newFuelQuoteController.getNewFuelQuote);     // read (doesn't store in db)
  
module.exports = router;
