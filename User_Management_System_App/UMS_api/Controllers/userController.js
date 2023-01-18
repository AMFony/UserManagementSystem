const   express = require('express'),
        Pool = require('pg-pool'),
        bcrypt = require('bcrypt'),
        userRouter = express.Router(),
        authentication = require('../Middlewires/authentication'); 
const   path = require('path');   
const   uniqueFilename = require('unique-filename');
const fileUpload = require('express-fileupload');
	
const   pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'userdb',
        password: 'Asib',
        port: 5432
    });

userRouter.get("/users", authentication, async (req, res)=>{
    let client = await pool.connect();
    try
    {
        var results = await client.query('SELECT * FROM users');
        res.status(200).json(results.rows)
    }
    catch (e)
    {
        res.status(500).json("Server error");
        console.error(e.message, e.stack);
    }
    finally{
        client.release();
    }  
});
userRouter.get("/users/:id", async (req, res)=>{
    let id= req.params.id;
    let client = await pool.connect();
    try
    {
        var results = await client.query
            ('SELECT userid, username, fullname, birthdate, gender, mobile, email FROM users WHERE userid=$1', [id]);
        console.log(results.rows[0])
        res.status(200).json(results.rows[0])
    }
    catch (e)
    {
        res.status(500).json("Server error");
        console.error(e.message, e.stack);
    }
    finally{
        client.release();
    }  
});
userRouter.get("/users/name/:name", async (req, res)=>{
    let name= req.params.name;
    let client = await pool.connect();
    try
    {
        var results = await client.query
            ('SELECT userid, username, fullname, birthdate, gender, mobile, email, picture FROM users WHERE LOWER(username)=LOWER($1)', [name]);
        console.log(results.rows[0])
        res.status(200).json(results.rows[0])
    }
    catch (e)
    {
        res.status(500).json("Server error");
        console.error(e.message, e.stack);
    }
    finally{
        client.release();
    }  
});
userRouter.post("/users", authentication, async (req, res)=>{
    let {username, password, fullname, birthdate, gender, mobile, email}=req.body;
    let hash =await bcrypt.hash(password, 10);
    let client = await pool.connect();
    try
    {
        var results = await client.query
            ('INSERT INTO users (username, password, fullname, birthdate, gender, mobile, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [username, hash, fullname, birthdate, gender, mobile, email]);
        res.status(201).json(results.rows[0]);
    }
    catch (e)
    {
        res.status(500).json("Server error");
        console.error(e.message, e.stack);
    }
    finally{
        client.release();
    }  
});
userRouter.put("/users/:id",authentication,async (req, res)=>{
    let id = req.params.id
    let {fullname, birthdate, gender, mobile, email}=req.body;
    let client = await pool.connect();
    try
    {
        var results = await client.query
            ('UPDATE users SET fullname=$1, birthdate=$2, gender=$3, mobile=$4, email=$5 WHERE userid=$6 RETURNING *',
                [fullname, birthdate, gender, mobile, email, id]);
        res.status(202).json(results.rows[0]);
    }
    catch (e)
    {
        res.status(500).json("Server error");
        console.error(e.message, e.stack);
    }
    finally{
        client.release();
    }  
});
userRouter.delete("/users/:id",authentication, async (req, res)=>{
    let id = req.params.id
    let client = await pool.connect();
    try
    {
        var results = await client.query('DELETE FROM users WHERE userid=$1',[id]);
        res.status(200).json(true);
    }
    catch (e)
    {
        res.status(500).json("Server error");
        console.error(e.message, e.stack);
    }
    finally{
        client.release();
    }  
});
userRouter.post("/users/upload/:name", authentication, async(req, res)=>{
    let username= req.params.name;
    let file = req.files.pic;
    let ext = path.extname(file.name);
    var savePath = path.join(__dirname,'../uploaded');
    let f= uniqueFilename(savePath)+ext;
    let bf = path.basename(f);
    console.log(f);
    file.mv(f, err=>{
        if(err)
            res.status(500).json(err);
    })
    
    let client = await pool.connect();
    try
    {
        var results = await client.query('UPDATE  users SET picture=$1 WHERE LOWER(username)=LOWER($2)',[ bf, username]);
        console.log(results);
        res.status(200).json({imgname:bf});
    }
    catch (e)
    {
        res.status(500).json("Failed to update");
        console.error(e.message, e.stack);
    }
    finally{
        client.release();
    }  
});
module.exports = userRouter;