import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnClaudinnary} from "../utils/Claudinary.js"
import{ApiResponse}
// to register a user 
// 1st step will be of taking the credentials from the user and save it on our database and with encryption
//aply validation
//check the user of already exixt :username and with email,
// chek for images and avatar,
// and uplaod to the claudinary
// create user object , becoz of its mostly used in no sql databases,
// remove refresh token , password ,
// check for the user creation  and return the response , if not then send the error.
const registerUser=asyncHandler(async(req,res)=>{
// const {email}=req.body
// console.log("email: ", email);



//taking credentials
const {fullname, email,username,password}=req.body
console.log("email",email);

// if(fullname===""){
//     throw new ApiError(400,"Fullname is required")
// }

//validation

if ([fullname,email,username,password].some((field)=>
field?.trim()===""
)) {
throw new ApiError(400, "all fields are required")    
}

//exixsting user
const ExitingUser =User.findOne({
    $or:[{ email } , { username }]
})
if(ExitingUser){
    throw new ApiError(400, "This emial or username is already registerd")
}
console.log("Existing user content",ExitingUser);


//chek for images and avatar,
const avatarLocalpath = req.file?.avatar[0]?.path
// console.log("file checking for images by multer",file);
console.log("avatarlocalpath " , avatarLocalpath);
const CoverImageLocalPath= req.file?.coverImage[0]?.path;
console.log("cover image path : ", CoverImageLocalPath);

if(!avatarLocalpath){
    throw new ApiError(400,"avatar image is required")
}

//uploading the image to cloudinary

const AvtarUploadingOnCloudinary=await uploadOnClaudinnary(avatarLocalpath)
const CoverimageUploadingOnCloudinary=await uploadOnClaudinnary(CoverImageLocalPath)

if(!AvtarUploadingOnCloudinary){
    throw new ApiError(400, "Avatar image is required")
}

// creating user object to store in databse
const user= await User.create(
    {
        fullname,
        avatar:AvtarUploadingOnCloudinary.url,
        coverImage:CoverimageUploadingOnCloudinary?.url ||"",
        email,
        password,
        username: username.toLowerCase()

    }
)

const CreatedUser=await User.findById(user._id).select(
    "-password - refreshToken"
)

if(!CreatedUser){
    throw new ApiError(500, "Something went wrong while registering the user")
}
return res.status(201).json(
    new ApiResponse(200,CreatedUser,"user Registerd SuccessFully")
)


})
export {registerUser} 