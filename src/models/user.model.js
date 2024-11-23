import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
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

    },
    {
        timestamps:true
    }
)
userSchema.pre("save", async function(next){
    if(!this.isModified) return next();
        this.password=bcrypt.hash(this.password, 11)
    next();
})
userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.add.methods.generateAccessToken=  function(){
    jwt.sign(
        {
            _id:this.id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY

        },
)
}
userSchema.add.methods.generateRefreshToken=  function(){
    jwt.sign(
        {
            _id:this.id,
          
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY

        },
)
}

export const User = mongoose.model("User", userSchema)