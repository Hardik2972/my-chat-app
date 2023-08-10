const User = require("../models/user");
const generateToken = require("../config/generateJsonToke");

const handleUserSignup = async (req,res) => {
    try{
    const {name,email,password} = req.body;
    if(!email || !password){
        res.status(400).send("please fill all the fields"); 
    }

    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400).send("user already exist");
    }
   
        let user = new User();
        user.email = email;
        user.password = password;
        user.name = name;
        await user.save();
        let mytoken = generateToken(user._id);
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
catch(err){
    console.log("this  is the error ",err);
}
}

module.exports = handleUserSignup;