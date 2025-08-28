import { firestore } from "@/config/firebase";
import { AccountType, ResponseType } from "@/types";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const createOrUpdateAccount = async (
  accountData: Partial<AccountType>
): Promise<ResponseType> => {
  try {
    let accountToSave = { ...accountData };

    if (accountData.image) {
      // Upload the image to cloudinary
      const imageUploadResponse = await uploadFileToCloudinary(
        accountData?.image?.uri,
        "accounts"
      );
      if (!imageUploadResponse.success) {
        return {
          success: false,
          msg: imageUploadResponse.msg || "Failed to upload accouunt icon",
        };
      }
      // Update the account data with the new image url
      accountToSave.image = imageUploadResponse.data;
    }

    // If its new account, set default values
    if (!accountData.id) {
      //  New Account
      accountData.amount = 0;
      accountData.totalIncome = 0;
      accountData.totalExpenses = 0;
      accountData.created = new Date();
    }

    // Create or update the account
    const accountRef = accountData.id
      ? doc(firestore, "accounts", accountData?.id)
      : doc(collection(firestore, "accounts"));

    await setDoc(accountRef, accountToSave, { merge: true });

    return {
      success: true,
      data: { ...accountToSave, id: accountRef.id },
    };
  } catch (error: any) {
    return {
      success: false,
      msg: error.message,
    };
  }
};

export const deleteAccount = async (
  accountId: string
): Promise<ResponseType> => {
  try {
    await deleteDoc(doc(firestore, "accounts", accountId));
    return { success: true, msg: "Account deleted successfully" };
  } catch (error: any) {
    return { success: false, msg: error.message };
  }
};
