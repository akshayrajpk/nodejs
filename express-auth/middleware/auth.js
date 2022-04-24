const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    const token = req.header('token')

    if(!token){
        return res.status(401).json({msg: "No token, access denied"})
    }

    //Verify
    try{
        const decode = jwt.verify(token, config.get('jwtSecret'))

        req.user = decode.user
        next()

    }catch(err) {
        res.status(401).json({msg: "Invalid Token"})
    }
}