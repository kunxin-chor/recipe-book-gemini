const jwt = require('jsonwebtoken');

// function to generate an access token
function generateAccessToken(id, email) {
    // set the payload of the JWT (i.e, developers can add any data they want)
    let payload = {
        'user_id': id,
        'email': email,
    }

    // create the JWT
    // jwt.sign()
    // - parameter 1: the payload (sometimes known as 'claims')
    // - parameter 2: token secret,
    // - parameter 3: options (to set expiresIn)
    let token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        'expiresIn':'1h' // h for hour, d for days, m is for minutes and s is for seconds
    });

    return token;
}

// middleware: a function that executes before a route function
function verifyToken(req, res, next) {
    // get the JWT from the headers
    let authHeader = req.headers['authorization'];
    let token = null;
    if (authHeader) {
        // the token will be stored as in the header as:
        // BEARER <JWT TOKEN>
        token = authHeader.split(' ')[1];
        if (token) {
            // the callback function in the third parameter will be called after
            // the token has been verified
            jwt.verify(token, process.env.TOKEN_SECRET, function(err, payload){
                if (err) {
                    console.error(err);
                    return res.sendStatus(403);
                }
                // save the payload into the request
                req.user = payload;
                // call the next middleware or the route function
                next();
                
            })
        } else {
            return res.sendStatus(403);
        }
    } else {
        return res.sendStatus(403);
    }
}

module.exports = {
    generateAccessToken,
    verifyToken
};
