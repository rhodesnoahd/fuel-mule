const ClientInformation = require("../models/ClientInformation");
const FuelQuote = require("../models/FuelQuote");
const asyncHandler = require("express-async-handler");
const Pricing = require("../modules/Pricing");

// @desc Create new fuel quote
// POST /new-fuel-quote
const createNewFuelQuote = asyncHandler(async (req, res) => {
  const {
    user_credentials,
    gallons_requested,
    delivery_date,
    address1,
    address2,
    city,
    _state,
    zipcode,
  } = req.body;

  // confirm data
  if (
    !user_credentials ||
    !gallons_requested ||
    !address1 ||
    !city ||
    !_state ||
    !zipcode ||
    !delivery_date
  ) {
    // HTTP status 400 = bad request
    return res.status(400).json({ message: "All fields are required" });
  }

  // query history
  const jsonObject = await FuelQuote.find({
    user_credentials: user_credentials,
  }).exec();

  history = jsonObject?.length ? true : false;
  const pricingModuleObject = new Pricing(_state, history, gallons_requested);
  let suggested_price = pricingModuleObject.get_suggested_price();
  let total_amount_due = gallons_requested * suggested_price;

  const fuelQuoteObject = {
    user_credentials,
    gallons_requested,
    delivery_date,
    address1,
    address2,
    city,
    _state,
    zipcode,
    suggested_price,
    total_amount_due,
  };

  // create and store new quote
  const quote = await FuelQuote.create(fuelQuoteObject);
  // quote.save()
  if (quote) {
    // HTTP status 201 = created
    res.status(201).json({
      message: "New quote created",
      _sP: quote.suggested_price,
      _tA: quote.total_amount_due,
    });
  } else {
    // HTTP status 400 = bad request
    res.status(400).json({ message: "Invalid quote data received" });
  }
});

// @desc Get new fuel quote
// PUT /new-fuel-quote
const getNewFuelQuote = asyncHandler(async (req, res) => {
  const { user_credentials, gallons_requested, _state } = req.body;

  // confirm data
  if (!user_credentials || !gallons_requested || !_state) {
    // HTTP status 400 = bad request
    return res.status(400).json({ message: "All fields are required" });
  }

  // query history
  const jsonObject = await FuelQuote.find({
    user_credentials: user_credentials,
  }).exec();

  history = jsonObject?.length ? true : false;
  const pricingModuleObject = new Pricing(_state, history, gallons_requested);
  let suggested_price = pricingModuleObject.get_suggested_price();
  let total_amount_due = gallons_requested * suggested_price;

  const priceData = {
    _suggested_price: suggested_price,
    _total_amount_due: total_amount_due
  }
  JSON.stringify(priceData)

  if (priceData) {
    // HTTP status 200 = OK
    res.status(200).json({
      message: "Here is your free quote! Click submit to save",
      _sP: priceData._suggested_price,
      _tA: priceData._total_amount_due,
    });
  } else {
    // HTTP status 400 = bad request
    res.status(400).json({ message: "Invalid quote data received" });
  }
});

// TODO remove these comments below
// const getHistory = asyncHandler(async (req, res) => {
//   const { user_credentials } = req.body;
// });

module.exports = { createNewFuelQuote, getNewFuelQuote };
// module.exports = { createNewFuelQuote, getHistory };
