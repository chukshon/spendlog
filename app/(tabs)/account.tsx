import Loading from "@/components/Loading";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import AccountListItem from "@/containers/accounts/AccountListItem";
import { useAuth } from "@/contexts/authContext";
import useFetchData from "@/hooks/useFetchData";
import { AccountType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import { orderBy, where } from "firebase/firestore";
import * as Icons from "phosphor-react-native";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const Account = () => {
  const { user } = useAuth();
  const {
    data: accounts,
    loading,
    error,
  } = useFetchData<AccountType>("accounts", [
    where("uid", "==", user?.uid),
    orderBy("createdAt", "desc"),
  ]);

  const router = useRouter();
  const getTotalBalance = () => {
    return 2344;
  };
  return (
    <ScreenWrapper style={{ backgroundColor: colors.black }}>
      <View style={styles.container}>
        {/* Balance View */}
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <Typo size={45} fontWeight={"500"}>
              ${getTotalBalance().toFixed(2)}
            </Typo>
            <Typo size={16} color={colors.neutral300}>
              Total Balance
            </Typo>
          </View>
        </View>

        {/* Accounts */}
        <View style={styles.accounts}>
          {/* Header */}
          <View style={styles.flexRow}>
            <Typo size={20} fontWeight={"500"}>
              My Accounts
            </Typo>
            <TouchableOpacity
              onPress={() => router.push("/(modals)/accountModal")}
            >
              <Icons.PlusCircleIcon
                weight="fill"
                size={verticalScale(33)}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Accounts List */}
          {loading && <Loading />}

          <FlatList
            data={accounts}
            renderItem={({ item, index }) => (
              <AccountListItem item={item} index={index} router={router} />
            )}
            contentContainerStyle={styles.listStyle}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  accounts: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25,
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  },
});
