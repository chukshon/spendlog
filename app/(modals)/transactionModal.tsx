import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { expenseCategories, transactionTypes } from "@/constants/data";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import useFetchData from "@/hooks/useFetchData";
import { AccountType, TransactionType } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { useLocalSearchParams, useRouter } from "expo-router";
import { orderBy, where } from "firebase/firestore";
import * as Icons from "phosphor-react-native";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const TransactionModal = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState<TransactionType>({
    type: "expense",
    amount: 0,
    description: "",
    date: new Date(),
    category: "",
    accountId: "",
    image: null,
  });

  const {
    data: accounts,
    loading: accountsLoading,
    error: accountsError,
  } = useFetchData<AccountType>("accounts", [
    where("uid", "==", user?.uid),
    orderBy("createdAt", "desc"),
  ]);

  const transactionParams: {
    transactionName: string;
    transactionImage: string;
    transactionId: string;
  } = useLocalSearchParams();

  const onSelectImage = (file: any) => {
    setTransaction({ ...transaction, image: file });
  };

  const onClearImage = () => {
    setTransaction({ ...transaction, image: null });
  };

  const showDeleteTransactionAlert = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
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
          onPress: onDeleteTransaction,
          style: "destructive",
        },
      ]
    );
  };

  const onDeleteTransaction = async () => {
    if (!transactionParams?.transactionId) return;
    setLoading(true);
    const res = await deleteTransaction(transactionParams?.transactionId);
    setLoading(false);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Transaction", res.msg);
    }
  };

  const onSubmit = async () => {
    // let { name, image } = transaction;
    // if (!name.trim() || !image) {
    //   Alert.alert("User, Please fill all the fields");
    //   return;
    // }
    // const data: TransactionType = {
    //   name,
    //   image,
    //   uid: user?.uid as string,
    // };
    // if (transactionParams?.transactionId) {
    //   data.id = transactionParams.transactionId;
    // }
    // setLoading(true);
    // const res = await createOrUpdateAccount(data);
    // setLoading(false);
    // if (res.success) {
    //   router.back();
    // } else {
    //   Alert.alert("Error", res.msg);
    // }
  };

  // // Get the old account data from the params if it exists and set the account state
  // useEffect(() => {
  //   if (transactionParams?.transactionId) {
  //     setTransaction({
  //       name: transactionParams.transactionName,
  //       image: transactionParams.transactionImage,
  //     });
  //   }
  // }, [transactionParams]);

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={
            transactionParams?.transactionId
              ? "Update Transaction"
              : "New Transaction"
          }
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        {/* Form */}
        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >
          {/* Transaction Type */}
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Transaction Type</Typo>

            <Dropdown
              style={styles.dropdownContainer}
              activeColor={colors.neutral700}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              iconStyle={styles.dropdownIcon}
              data={transactionTypes}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              placeholder={"Select Transaction Type"}
              value={transaction.type}
              onChange={(item) => {
                setTransaction({ ...transaction, type: item.value });
              }}
            />
          </View>

          {/* Account */}
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Account</Typo>
            <Dropdown
              style={styles.dropdownContainer}
              activeColor={colors.neutral700}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              iconStyle={styles.dropdownIcon}
              data={accounts.map((account) => ({
                label: `${account.name} ($${account.amount})`,
                value: account.id,
              }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              placeholder={"Select Account"}
              value={transaction.accountId}
              onChange={(item) => {
                setTransaction({ ...transaction, accountId: item.value });
              }}
            />
          </View>

          {/* Expense Category */}
          {transaction.type === "expense" && (
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200}>Expense Category</Typo>
              <Dropdown
                style={styles.dropdownContainer}
                activeColor={colors.neutral700}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelectedText}
                iconStyle={styles.dropdownIcon}
                data={Object.values(expenseCategories)}
                maxHeight={300}
                labelField="label"
                valueField="value"
                itemTextStyle={styles.dropdownItemText}
                itemContainerStyle={styles.dropdownItemContainer}
                containerStyle={styles.dropdownListContainer}
                placeholder={"Select Category"}
                value={transaction.category}
                onChange={(item) => {
                  setTransaction({ ...transaction, category: item.value });
                }}
              />
            </View>
          )}

          {/* Date Picker */}

          {/* Transaction Image */}
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Transaction Image</Typo>
            <ImageUpload
              file={transaction.image}
              placeholder="Upload Image"
              onSelect={(file) => onSelectImage(file)}
              onClear={onClearImage}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {transactionParams?.transactionId && !loading && (
          <Button
            onPress={showDeleteTransactionAlert}
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
            {transactionParams?.transactionId
              ? "Update Transaction"
              : "Add Transaction"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default TransactionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  form: {
    gap: spacingY._20,
    paddingVertical: spacingY._15,
    paddingBottom: spacingY._40,
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
  inputContainer: {
    gap: spacingY._10,
  },
  iosDropdown: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    justifyContent: "center",
    fontSize: verticalScale(14),
    borderWidth: 1,
    color: colors.white,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },
  androidDropdown: {
    height: verticalScale(54),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    fontSize: verticalScale(14),
    color: colors.white,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._5,
  },
  dateInput: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },
  iosDatePicker: {
    // console.log('red')
  },
  datePickerButton: {
    backgroundColor: colors.neutral700,
    alignSelf: "flex-end",
    padding: spacingX._7,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._10,
  },
  dropdownContainer: {
    height: verticalScale(54),
    borderWidth: 1,
    borderColor: colors.neutral300,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  dropdownItemText: {
    color: colors.white,
  },
  dropdownSelectedText: {
    color: colors.white,
    fontSize: verticalScale(14),
  },
  dropdownListContainer: {
    backgroundColor: colors.neutral900,
    borderRadius: radius._15,
    borderCurve: "continuous",
    paddingVertical: spacingY._7,
    top: 5,
    borderColor: colors.neutral500,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  dropdownPlaceholder: {
    color: colors.white,
  },
  dropdownItemContainer: {
    borderRadius: radius._15,
    marginHorizontal: spacingX._7,
  },
  dropdownIcon: {
    height: verticalScale(30),
    tintColor: colors.neutral300,
  },
});
