import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
userName : {
    type:String,
    required : true
},

email : {
    type:String,
    required : true
},
passWord : {
    type:String,
    required : true,
    select : false
},
confirmPassword : {
    type:String,
},
role : {
type : String,
enum:["user","admin"],
default : "user"
},
CreatedDate:{
    type:Date,
    default:Date.now()
}

})
const USER = mongoose.model("USER",userSchema);
export { USER }