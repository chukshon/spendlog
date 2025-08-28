import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import {
  createOrUpdateAccount,
  deleteAccount,
} from "@/services/accountService";
import { AccountType } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

const AccountModal = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<AccountType>({
    name: "",
    image: null,
  });

  const accountParams: {
    accountName: string;
    accountImage: string;
    accountId: string;
  } = useLocalSearchParams();

  // Get the old account data from the params if it exists and set the account state
  useEffect(() => {
    if (accountParams?.accountId) {
      setAccount({
        name: accountParams.accountName,
        image: accountParams.accountImage,
      });
    }
  }, [accountParams]);

  const onSelectImage = (file: any) => {
    setAccount({ ...account, image: file });
  };

  const onClearImage = () => {
    setAccount({ ...account, image: null });
  };

  const showDeleteAccountAlert = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this account?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("cancel");
          },
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: onDeleteAccount,
          style: "destructive",
        },
      ]
    );
  };

  const onDeleteAccount = async () => {
    if (!accountParams?.accountId) return;
    setLoading(true);
    const res = await deleteAccount(accountParams?.accountId);
    setLoading(false);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Account", res.msg);
    }
  };

  const onSubmit = async () => {
    let { name, image } = account;
    if (!name.trim() || !image) {
      Alert.alert("User, Please fill all the fields");
      return;
    }

    const data: AccountType = {
      name,
      image,
      uid: user?.uid as string,
    };

    if (accountParams?.accountId) {
      data.id = accountParams.accountId;
    }

    setLoading(true);
    const res = await createOrUpdateAccount(data);
    setLoading(false);

    if (res.success) {
      router.back();
    } else {
      Alert.alert("Error", res.msg);
    }
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={accountParams?.accountId ? "Update Account" : "New Account"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* Form */}
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Account Name</Typo>
            <Input
              placeholder="Account Name"
              value={account.name}
              onChangeText={(value) => {
                setAccount({ ...account, name: value });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Account Name</Typo>
            <ImageUpload
              file={account.image}
              placeholder="Upload Image"
              onSelect={(file) => onSelectImage(file)}
              onClear={onClearImage}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {accountParams?.accountId && !loading && (
          <Button
            onPress={showDeleteAccountAlert}
            loading={loading}
            style={{
              backgroundColor: colors.rose,
              paddingHorizontal: spacingX._15,
            }}
          >
            <Icons.TrashIcon
              color={colors.white}
              size={verticalScale(20)}
              weight="bold"
            />
          </Button>
        )}
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.black} fontWeight={"700"} size={18}>
            {accountParams?.accountId ? "Update Account" : "Add Account"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default AccountModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    justifyContent: "space-between",
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingX._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._5,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
