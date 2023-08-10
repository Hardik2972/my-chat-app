const express = require ("express");
const cors = require ("cors");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const session = require("express-session");
const passport =require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/userChatDB",{useNewUrlParser: true})
.then(()=> console.log("mongo is connected now"))
.catch((err)=> console.log("the mongo error is",err));

const app=express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user',userSchema);

passport.User(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User,deserializeUser());





app.get("/test",(req,res)=>{
    req.session.test?req.session.test++ : req.session.test=1;
    res.send(req.session.test.toString());
})




app.post("/register",async (req,res)=>{
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;

    const doc = await user.save();

    console.log(doc);

    res.json(doc);
})

app.post("/login",async (req,res)=>{
     var username=req.body.email;
     var password=req.body.password;

     User.findOne({email: username})
     .then((foundUser)=>{
        if(foundUser === null){
            res.send(false);
        }
        else if(foundUser.password === password){
            res.send(true);
        }
        else{
            res.send(false);
        }
     }).catch((err)=> console.log("this is the error in server login page",err));
})
app.listen(8080,()=>{
    console.log("sesrver has been started");
});