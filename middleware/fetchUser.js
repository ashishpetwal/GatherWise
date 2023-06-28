const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');

const fetchUser = async (req, res, next)=>{
    const token = req.header("auth_token");
    if(!token){
        res.status(401).send({error: "Unauthorized Access 1"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Unauthorized Access 2"})
    }
}

module.exports = fetchUser;