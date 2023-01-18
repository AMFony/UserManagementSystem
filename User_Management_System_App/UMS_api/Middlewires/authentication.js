const jwt = require("jsonwebtoken");
const authentication  = (req, res, next)=>{
    try{
        let headerValue = req.headers.authorization;
        console.log(headerValue)
        if(headerValue){
        let v = headerValue.split(' ')[1];
        let token = jwt.verify(v, 'UMS_App');
        req.username = token.username;
        next();
       }
       else
       {
       	res.status(401).json({message: 'Unauthorized user'});
       }
    }
    catch(e)
    {
        res.status(401).json({message: 'Unauthorized user'});
    }
}
module.exports = authentication;