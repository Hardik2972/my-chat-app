const express = require("express");
const Message = require("../models/messageMode");

const router = express.Router();

router.post("/",async (req,res)=>{
    const {sender,content,chat}=req.body;
    
    const message = new Message();
    message.sender = sender;
    message.content = content;
    message.chat = chat;

    await message.save();

    const data = message.populate({
        path: "sender"
    })
    res.json(data);

    
});

module.exports = router;