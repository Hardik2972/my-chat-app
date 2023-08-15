const express = require("express");
const Message = require("../models/messageMode");
const router = express.Router();

router.get("/",async (req,res)=>{
    try{
    const messages = await Message.find({chat:req.query.id}).populate({
        path:"sender",
    }).populate({
        path:"chat",
    });
    if(messages){
        res.json(messages);
        // res.json(messages);
    }
    else{
        res.json({hbye:"balle"});
    }
    
} catch(err){
    console.log("the error in the fetchmessage api",err);
}
})

module.exports = router;