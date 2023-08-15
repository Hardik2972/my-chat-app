const User = require("../models/user");
const generateToken = require("../config/generateJsonToke");
const Chat = require("../models/chatModel");

const handleUserSignup = async (req,res) => {
    try{
    const {name,position,email,password} =await req.body;
    // if(!email || !password){
    //     res.status(400).send("please fill all the fields"); 
    // }

    // const userExist = await User.findOne({email});
    // if(userExist){
    //     res.status(400).send("user already exist");
    // }
        console.log(name,email,password);
        let user =await new User();
        user.name = name;
        user.position = position;
        user.email = email;
        user.password = password;
        
        
        await user.save();
        let mytoken = generateToken(user._id);
        
        if(position==="Mentee"){
            let chat = new Chat();
            chat.mentee = user._id;
            await chat.save();
            if(user){
            res.status(201).json({
                    _id: user._id,
                    email: user.email,
                    password: user.password,
                    token: mytoken,
                });
            }
            else{
               res.status(400).send("not able to create user in database");
            }
        }
        else{
            let items=await User.find({position: "Mentee"});
            console.log(items);
            for(let i=0;i<items.length;i++){
                Chat.findOneAndUpdate({},{ mentor: user._id });
            }
            if(user){
                res.status(201).json({
                    _id: user._id,
                    email: user.email,
                    password: user.password,
                    token: mytoken,
                });
            };

        }
}
catch(err){
    console.log("this  is the error ",err);
}
}

module.exports = handleUserSignup;