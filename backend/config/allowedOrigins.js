const { all } = require("../routes/root")

const allowedOrigins = [
    'http://localhost:3000',
    // 'http://localhost:3500'
]

module.exports = allowedOrigins