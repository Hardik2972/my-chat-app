const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req,res)=>{
    let user = await User.findOne({_id: req.query.id});
    if(user){
        





        res.json({
            email:user.email,
            password:user.password,
            name:user.name,
        })
    };
});

module.exports = router;