const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorLog.log')
    
    // prints a large message to the console which provides many details about an error
    // err.stack tells specifically WHERE an error is, which is helpful
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500 // server error
    
    res.status(status)

    // response message is json data
    res.json({ message: err.message })
}

module.exports = errorHandler