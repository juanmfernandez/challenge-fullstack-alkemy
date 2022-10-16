const jwt = require("jsonwebtoken");

function AuthToken(req, res, next) {
    const auth = req.get('authorization');

    let token = "";

    if (auth && auth.toLowerCase().startsWith('bearer')) {
        token = auth.substring(7)
    }

    let decodeToken;

    try {
        decodeToken = jwt.verify(token, process.env.SECRET)
    } catch (error) {
        return res.status(401).json({error: "Invalid token or missing"})
    }

    if ( !token || !decodeToken.id ) {
        return res.status(401).json({errors: "Invalid token or missing"})
    }   

    req.token = decodeToken;
    req.body.idUser = decodeToken.id;

    next()
}


module.exports = AuthToken;