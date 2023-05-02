const ClientInformation = require("../models/ClientInformation")
const asyncHandler = require("express-async-handler")

// @desc Create new client
// @route POST /profile-management
const createNewClient = asyncHandler(async (req, res) => {
  const {
    user_credentials,
    fullname,
    address1,
    address2,
    city,
    _state,
    zipcode,
  } = req.body

  // confirm data
  if (
    !user_credentials ||
    !fullname ||
    !address1 ||
    !city ||
    !_state ||
    !zipcode
  ) {
    // HTTP status 400 = bad request
    return res
      .status(400)
      .json({ message: "All fields except address 2 are required" })
  }

  // TODO route in frontend such that we don't need this check
  // check duplicates
  const duplicate = await ClientInformation.findOne({ user_credentials })
    .lean()
    .exec()
  if (duplicate) {
    // HTTP status 409 = conflict
    return res.status(409).json({ message: "Client already exists" })
  }

  // create and store new client
  const client = await ClientInformation.create({
    user_credentials,
    fullname,
    address1,
    address2,
    city,
    _state,
    zipcode,
  })
  if (client) {
    // HTTP status 201 = created
    return res.status(201).json({
      message: "New client created",
      id: client._id,
      _uC: client.user_credentials,
      _fullname: client.fullname,
      _address1: client.address1,
      _address2: client.address2,
      _city: client.city,
      __state: client._state,
      _zipcode: client.zipcode,
    })
  } else {
    // HTTP status 400 = bad request
    return res.status(400).json({ message: "Invalid client data received" })
  }
})

// @desc Update a client
// @route PUT /profile-management
const updateClient = asyncHandler(async (req, res) => {
  const {
    user_credentials,
    fullname,
    address1,
    address2,
    city,
    _state,
    zipcode,
  } = req.body

  // confirm data
  if (
    !user_credentials ||
    !fullname ||
    !address1 ||
    !city ||
    !_state ||
    !zipcode
  ) {
    // HTTP status 400 = bad request
    return res.status(400).json({ message: "At least one field is required" })
  }

  // confirm client exists
  const client = await ClientInformation.findOne({ user_credentials }).exec()
  if (!client) {
    // HTTP status 400 = bad request
    return res.status(400).json({ message: "Client not found" })
  }

  client.fullname = fullname
  client.address1 = address1
  client.address2 = address2
  client.city = city
  client._state = _state
  client.zipcode = zipcode

  const updatedClient = await client.save()

  // HTTP status 200 = OK
  return res.status(201).json({
    message: `${updatedClient.fullname} updated`,
    id: updatedClient._id,
    _uC: updatedClient.user_credentials,
    _fullname: updatedClient.fullname,
    _address1: updatedClient.address1,
    _address2: updatedClient.address2,
    _city: updatedClient.city,
    __state: updatedClient._state,
    _zipcode: updatedClient.zipcode,
  })
})

module.exports = { createNewClient, updateClient }
