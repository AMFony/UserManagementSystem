const   express = require('express'),
        jwt = require("jsonwebtoken")
        accountRouter = express.Router(),
        repository = require('../Repositories/userRepository');
       
accountRouter.post('/register', async(req, res)=>{
    let {username, password, fullname, birthdate, gender, mobile, email}=req.body;
    console.log({username, password, fullname, birthdate, gender, mobile, email});
    let result = await repository.createUser({username, password, fullname, birthdate, gender, mobile, email});
    if(result)
        res.status(201).json(result.username+ ' created');
    else
        res.status(500).json('Registration failed');
});
accountRouter.post('/login', async(req, res)=>{
    let {username, password}=req.body;
    let userFound = await repository.userFound(username);
    if(!userFound) return res.status(404).json({message: 'User not found'});
    let verified = await repository.checkUserCredential(username, password);
    if(!verified) return res.status(400).json({message: 'Username or password invalid'});
    let token = jwt.sign({username:username}, 'UMS_App', {expiresIn:'600s'});
    let refreshToken = jwt.sign({username:username}, 'UMS_App', {expiresIn:'1d'});
    res.status(200).json({username:username, token:token, refreshToken:refreshToken});
});
accountRouter.get("/name/exists/:name", async (req, res)=>{
    let username = req.params.name;
    let found=await repository.userFound(username);
    return res.status(200).json(found);
});
accountRouter.get("/email/exists/:email", async (req, res)=>{
    let email = req.params.email;
    let found=await repository.emailFound(email);
    return res.status(200).json(found);
});
module.exports = accountRouter;