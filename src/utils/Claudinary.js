import { v2 as cloudinary } from "cloudinary";
import { unlink, unlinkSync } from 'node:fs';

cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret:process.env.CLOUD_SECRET_KEY 
});

const uploadOnClaudinnary=async(localFilePath)=>{
   try {
    if(!localFilePath) return null
  const response =await  cloudinary.uploader.upload(localFilePath,{
        resource_type:'auto',
    })

    console.log("your file has been uploaded to claudinary" ,response.url);
    return response;

    
   } catch (error) {
   
// Assuming that 'path/file.txt' is a regular file.
unlinkSync(localFilePath);


    
    
   }

}
export {uploadOnClaudinnary}