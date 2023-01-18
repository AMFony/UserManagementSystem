const   Pool = require('pg-pool'),
        bcrypt = require('bcrypt');
const   pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'userdb',
            password: 'Asib',
            port: 5432
        });
const userFound = async (username)=>{
    let client = await pool.connect();
    let found = false;
    try
    {
        var results = await client.query('SELECT 1 FROM users WHERE LOWER(username)=LOWER($1)', [username]);
        console.log(results.rows.length)
        if(results.rows.length> 0)
            found= true;
    }
    catch (e)
    {
        console.error(e.message, e.stack);
    }
    finally{
        client.release();
    }  
    return found;
}
const emailFound = async (email)=>{
    let client = await pool.connect();
    let found = false;
    try
    {
        var results = await client.query('SELECT * FROM users WHERE LOWER(email)=LOWER($1)', [email]);
        console.log(results.rows.length)
        if(results.rows.length> 0)
            found= true;  
    }
    catch (e)
    {
        console.error(e.message, e.stack);
    }
    finally{
        client.release();
    }  
    console.log(found);
    return found;
}
const createUser= async (user)=>{
    let hash =await bcrypt.hash(user.password, 10);
    let client = await pool.connect();
    let r= null;
    try
    {
        var results = await client.query
            ('INSERT INTO users (username, password, fullname, birthdate , gender , mobile, email) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *',
                [user.username, hash, user.fullname, user.birthdate, user.gender, user.mobile, user.email]);
        r= results.rows[0];
    }
    catch (e)
    {
        console.error(e.message, e.stack);
    }
    finally{
        client.release();
    }  
    return r;
}
const checkUserCredential = async (username, password)=>{
    let client = await pool.connect();
    let isVerified = false;
    try
    {
        var results = await client.query
            ('SELECT username, password FROM users WHERE LOWER(username)=LOWER($1)', [username]);
        if(results.rows.length> 0)
        {
            console.log(password);
            console.log(results.rows[0].password);
              let match=await  bcrypt.compare(password, results.rows[0].password);
              if(match){
                isVerified=true;
              }
              else{
                isVerified=false;
              }
        }
        else{
            isVerified=false
        }  
    }
    catch (e)
    {
        console.error(e.message, e.stack);
        isVerified=false; 
    }
    finally{
        client.release();
    }     
    return isVerified;
}
module.exports = {userFound, emailFound, createUser, checkUserCredential};
       