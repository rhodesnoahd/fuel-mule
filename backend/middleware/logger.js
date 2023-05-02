const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    
    try {
        // if directory dne, create it
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        // save logItem to logFile in logs directory
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
} 

const logger = (req, res, next) => {
    // this logs every req, consider adding conditions to reduce logEvents
    // perhaps log if not coming from our own url or only specific req methods
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    
    // will see in the log of node.js as we are running our server to help during dev 
    console.log(`${req.method} ${req.path}`)

    // move to the next piece of middleware or controller
    next()
}

module.exports = { logEvents, logger }