const FuelQuote = require("../models/FuelQuote")
const asyncHandler = require("express-async-handler")

// @desc Get fuel quote history for user
// @route GET /fuel-quote-history
const getFuelQuoteHistory = asyncHandler(async (req, res) => {
  // const { user_credentials } = req.body

  // // confirm data
  // if (!user_credentials) {
  //   // HTTP status 400 = bad request
  //   return res.status(400)
  // }

  const history = await FuelQuote.find()

  // TODO process/cleanup history before sending to frontend

  if (history?.length) {
    return res.status(200).json({ message: "Quote history found", history })
  } else {
    return res.json({ message: "No quote history found" })
  }
})

module.exports = { getFuelQuoteHistory }
