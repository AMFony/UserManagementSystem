const   express = require('express'),
        app     = express(),
        cors    = require("cors");
const fileUpload = require('express-fileupload');       
const userRouter = require("./Controllers/userController");
const accountRouter = require("./Controllers/accountController");
const corsOptions = {
    origin: 'http://localhost:4200'
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());
app.use("/api", userRouter);
app.use("/api/Account", accountRouter)
app.listen(5000, ()=>{
    console.log('Server running on port 5000');
});