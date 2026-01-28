import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    console.log("Uploading to Cloudinary:", localFilePath);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    console.log("Cloudinary success:", response.secure_url);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {
    console.log("CLOUDINARY UPLOAD ERROR ↓↓↓");
    console.log(error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

const deletedFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;

    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("CLOUDINARY DELETE ERROR:", error);
    return null;
  }
};

export { uploadOnCloudinary, deletedFromCloudinary };