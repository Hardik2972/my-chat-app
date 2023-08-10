const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/",(req,res)=>{
    const token= req.body.userToken;
    console.log("the id id ",jwt.decode(token).id)
    if(jwt.verify(token,"Hardik")){
        res.json({
            user: true,
            id: jwt.decode(token).id,
        });    
    }
    else{
        res.send(false);
    }
    
});

module.exports = router;