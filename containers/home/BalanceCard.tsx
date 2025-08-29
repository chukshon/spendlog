import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const BalanceCard = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/card.png")}
      resizeMode="stretch"
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <View>
          {/* Total Balance */}
          <View style={styles.totalBalanceRow}>
            <Typo color={colors.neutral800} fontWeight={"500"} size={17}>
              Total Balance
            </Typo>

            <Icons.DotsThreeOutlineIcon
              size={verticalScale(23)}
              color={colors.black}
              weight="fill"
            />
          </View>
          <Typo color={colors.black} fontWeight={"bold"} size={30}>
            $2343.23
          </Typo>
        </View>

        {/* Total Expenses and Income */}
        <View style={styles.stats}>
          {/* Income */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
              <View style={styles.statsIcon}>
                <Icons.ArrowDownIcon
                  size={verticalScale(15)}
                  color={colors.black}
                  weight="bold"
                />
                <Typo color={colors.neutral700} fontWeight={"600"} size={16}>
                  Income
                </Typo>
              </View>
            </View>

            <View style={{ alignSelf: "center" }}>
              <Typo color={colors.green} fontWeight={"600"}>
                2342
              </Typo>
            </View>
          </View>
          {/* Expenses */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
              <View style={styles.statsIcon}>
                <Icons.ArrowUpIcon
                  size={verticalScale(15)}
                  color={colors.black}
                  weight="bold"
                />
                <Typo color={colors.neutral700} fontWeight={"500"} size={16}>
                  Expenses
                </Typo>
              </View>
            </View>

            <View style={{ alignSelf: "center" }}>
              <Typo size={17} color={colors.rose} fontWeight={"600"}>
                2342
              </Typo>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  bgImage: {
    height: scale(210),
    width: "100%",
  },
  container: {
    padding: spacingX._20,
    paddingHorizontal: scale(23),
    height: "87%",
    width: "100%",
    justifyContent: "space-between",
  },
  totalBalanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._5,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsIcon: {
    backgroundColor: colors.neutral350,
    padding: spacingX._5,
    borderRadius: 50,
  },
  incomeExpense: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingY._7,
  },
});
