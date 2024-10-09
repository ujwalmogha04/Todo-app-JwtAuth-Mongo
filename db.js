const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    name  :  {type : String, required : true},
    email : {type : String, required : true , unique : true },
    password : {type : String, required : true},
})

const todoSchema = new Schema({
    title :  {type : String, required : true},
    done :  {type : Boolean , default : false},
    userId  : {type : ObjectId , ref : "User"},
})

const UserModel = mongoose.model("User" , userSchema);
const TodoModel = mongoose.model("Todo" , todoSchema);

module.exports = {
    UserModel ,
    TodoModel
}
