const mongoose = require("mongoose");

const connectDB = async() => {
    mongoose.connect("mongodb://127.0.0.1:27017/officialchatDB",{useNewUrlParser: true})
    .then(()=> console.log("mongo is connected now"))
    .catch((err)=> console.log("the mongo error is",err));
};

module.exports = connectDB;