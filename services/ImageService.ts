import { cloudinaryConfig } from "@/config.local";
import { ResponseType } from "@/types";
import axios from "axios";

const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (
  file: { uri?: string } | string,
  folderName: string
): Promise<ResponseType> => {
  try {
    if (typeof file === "string") {
      return { success: true, data: file };
    }

    if (file && file.uri) {
      const formData = new FormData();
      // Append the file to the form data
      formData.append("file", {
        uri: file.uri,
        name: "image/jpeg",
        type: file.uri.split(".").pop() || "file.jpg",
      } as any);

      formData.append(
        "upload_preset",
        cloudinaryConfig.CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("folder", folderName);

      // Upload the file to cloudinary
      const response = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return { success: true, data: response?.data?.secure_url };
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      msg: error.msg || "Could not upload file",
    };
  }
};

export const getProfileImage = (file: any) => {
  if (file && typeof file === "string") {
    return file;
  }

  if (file && typeof file === "object") {
    return file.uri;
  }

  return require("@/assets/images/defaultAvatar.png");
};

export const getFilePath = (file: any) => {
  if (file && typeof file === "string") {
    return file;
  }

  if (file && typeof file === "object") {
    return file.uri;
  }

  return null;
};
