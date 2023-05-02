const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        // !== -1 only allows strings listed in allowedOrigins
        // !origin allows things like postman, or desktop applicaitons
        // that don't provide an origin to access our RestAPI
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    // sets the access control allow credentials header
    credentials: true,
    // default is 204, but some devices like smartTVs, older browsers have trouble
    optionsSuccessStatus: 200
}

module.exports = corsOptions