import mongoose, { Schema } from "mongoose";
const userSchema =new Schema(
 {
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    avatar:{
        type:String,
        required:true,

    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            re:"Video"
        }
    ],
    password:{
        type:String,
        required: [true,"password is required"]
    },
    refreshToken:{
        type:String,
    }

    }
)

export const User = mongoose.model("User", userSchema)