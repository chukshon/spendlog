import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const updateUser = async (
  uid: string,
  updatedUserData: UserDataType
): Promise<ResponseType> => {
  try {
    if (updatedUserData.image) {
      // Upload the image to cloudinary
      const imageUploadResponse = await uploadFileToCloudinary(
        updatedUserData?.image?.uri,
        "users"
      );
      if (!imageUploadResponse.success) {
        return {
          success: false,
          msg: imageUploadResponse.msg || "Failed to upload image",
        };
      }
      // Update the user data with the new image url
      updatedUserData.image = imageUploadResponse.data;
    }

    // Fetch the user from firestore
    const userRef = doc(firestore, "users", uid);
    // Update the user data in firestore
    await updateDoc(userRef, updatedUserData);

    return {
      success: true,
      msg: "User updated successfully",
    };
  } catch (error: any) {
    console.log("error updating the user", error);
    return {
      success: false,
      msg: error?.message,
      data: null,
    };
  }
};
