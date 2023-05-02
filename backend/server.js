require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const { logger, logEvents } = require("./middleware/logger")
const errorHandler = require("./middleware/errorHandler")
const cookieParser = require("cookie-parser") // TODO I don't think we need this
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const mongoose = require("mongoose")
require("dotenv").config()
const PORT = process.env.PORT || 3500

//TODO setup logic to avoid need for comment/uncomment during testing
/*const NODE_ENV = process.env.NODE_ENV || "test";
if (NODE_ENV != "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}*/

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser()) // TODO I don't think we need this

app.use("/", express.static(path.join(__dirname, "/public")))

app.use("/", require("./routes/root"))

// routes & controllers working
app.use("/register", require("./routes/registerRoutes"))
app.use("/login", require("./routes/loginRoutes"))
app.use("/profile-management", require("./routes/profileManagementRoutes"))
app.use("/new-fuel-quote", require("./routes/newFuelQuoteRoute"))
app.use("/fuel-quote-history", require("./routes/fuelQuoteHistoryRoutes"))

app.all("*", (req, res) => {
  res.status(404)
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "/views", "404.html"))
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" })
  } else {
    res.type("txt").send("404 Not Found")
  }
})

app.use(errorHandler)

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB")
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on("err", (err) => {
  console.log(err)
  logEvents`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
})

module.exports = app
