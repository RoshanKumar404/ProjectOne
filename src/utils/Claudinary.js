import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name:  "firtone",
    api_key:"136639379976635",
    api_secret:"_eMxRzBMDZzMUT-6e9mr4-LYDGE",
    secure:true
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("No local file path provided for upload.");
            return null;
        }

        // Check if the file exists
        if (!fs.existsSync(localFilePath)) {
            console.error("File does not exist at path:", localFilePath);
            return null;
        }

        // Uploading file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Automatically detect file type
        });

        console.log("File successfully uploaded to Cloudinary:", response.url);

        // Clean up local file after upload
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);

        // Attempt to delete local file even if upload fails
        try {
            fs.unlinkSync(localFilePath);
        } catch (unlinkError) {
            console.error("Failed to delete local file:", unlinkError.message);
        }

        return null;
    }
};

export { uploadOnCloudinary };
