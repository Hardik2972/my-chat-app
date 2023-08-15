const express = require("express");
const User = require("../models/user");

const router = express.Router();
const Chat = require("../models/chatModel");

router.get("/", async (req,res)=>{
    let chat=[];
    let user = await User.findOne({_id:req.query.id});
    try{
    if(user){
        if(user.position==="Mentee"){
            chat=await Chat.find({mentee: req.query.id}).populate({
                path: "mentor",
            }).populate({
                path: "mentee",
            });
        }
        
        else{
            chat=await Chat.find({mentor: req.query.id}).populate({
                path: "mentor",
            }).populate({
                path: "mentee",
            });
        }
        res.json({
            chatsData:chat,
            position:user.position,
            email:user.email,
            password:user.password,
            name:user.name,
        })
    }
}
    catch(err){
        console.log("thsi is the error",err);
    }
});

module.exports = router;