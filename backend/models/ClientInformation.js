const mongoose = require("mongoose");

const clientInformationSchema = mongoose.Schema({
    user_credentials: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserCredentials'
    },
    fullname: {
        type: String,
        required: true,
        maxLength: [50, 'Enter up to 50 characters, got {VALUE}']
    },
    address1: {
        type: String,
        required: true,
        maxLength: [100, 'Enter up to 100 characters, got {VALUE}']
    },
    address2: {
        type: String,
        required: false,
        maxLength: [100, 'Enter up to 100 characters, got {VALUE}']
    },
    city: {
        type: String,
        required: true,
        maxLength: [100, 'Enter up to 100 characters, got {VALUE}']
    },
    _state: {
        type: String,
        required: true,
        maxLength: 2,
        minLength: 2
    },
    zipcode: {
        type: String,
        required: true,
        maxLength: [9, 'Enter up to 9 digits, got {VALUE}'],
        minLength: [5, 'Enter at least 5 digits, got {VALUE}']
    },
})

module.exports = mongoose.model("ClientInformation", clientInformationSchema);