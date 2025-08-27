import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";

export const updateUser = async (
  uid: string,
  updatedUserData: UserDataType
): Promise<ResponseType> => {
  try {
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updatedUserData);

    // Fetch the user && update the user state
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
