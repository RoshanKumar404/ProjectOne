import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js";
import  {uploadOnCloudinary} from "../utils/Claudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import router from "../routes/user.routes.js";
//steps to register a user
//get user details,
//validate the user details,
//chek user is alredy exist or not ,
//chek for images,avatar
//upload them to cloudinary,
//create a user object  to create a entry in ur databse,
//remove password and response token from  response
//chek for user creation
const registeruser = asyncHandler(async (req, res) => {
  const { username, email, password, fullname } = req.body;
  console.log("User Details:", { username, email, password, fullname });

  if ([fullname, email, password, fullname].some((field) => (field || "").trim() === "")) {
      throw new ApiError(400, "All fields are required");
  }

  const existinguser = await User.findOne({ $or: [{ email }, { username }] });
  if (existinguser) {
      throw new ApiError(400, "User with same name and email already exists");
  }

  const avatarlocalpath = req.files?.avatar[0]?.path;
  const coverimagelocalpath = req.files?.coverImage[0]?.path;
  console.log("Avatar Local Path:", avatarlocalpath);
  console.log("Cover Image Local Path:", coverimagelocalpath);

  if (!avatarlocalpath) {
      throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarlocalpath);
  const coverImage = await uploadOnCloudinary(coverimagelocalpath);
  console.log("Avatar Upload Result:", avatar);
  console.log("Cover Image Upload Result:", coverImage);

  if (!avatar) {
      throw new ApiError(400, "Avatar upload to Cloudinary failed");
  }

  const UserData = await User.create({
      fullname,
      email,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      password,
      username: username.toLowerCase(),
  });

  const createduser = await User.findById(UserData._id).select("-password -refreshToken");
  if (!createduser) {
      throw new ApiError(500, "Error while creating user");
  }

  return res.status(201).json(new ApiResponse(200, createduser, "User registered successfully"));
});



export {registeruser}