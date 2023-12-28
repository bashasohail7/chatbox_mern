const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:30
    },
    password:{
        type:String,
        required:true,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:''
    }
})
module.exports=mongoose.model('user',userSchema)