import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { updateUser } from "@/services/userService";
import { AccountType } from "@/types";
import { scale } from "@/utils/styling";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

const AccountModal = () => {
  const { user, updateUserData } = useAuth();
  const [account, setAccount] = useState<AccountType>({
    name: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSelectImage = (file: any) => {
    setAccount({ ...account, image: file });
  };

  const onClearImage = () => {
    setAccount({ ...account, image: null });
  };

  const onSubmit = async () => {
    let { name, image } = account;
    if (!name.trim()) {
      Alert.alert("User, Please fill all the fields");
      return;
    }

    setLoading(true);
    const res = await updateUser(user?.uid as string, account);
    setLoading(false);

    if (res.success) {
      // Update user data in the auth context
      updateUserData(user?.uid as string);
      Alert.alert("Success", res.msg);

      // On Successful update, route to the previous screen
      router.back();
    } else {
      Alert.alert("Error", res.msg);
    }
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="New Account"
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
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.black} fontWeight={"700"} size={18}>
            Add Account
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
