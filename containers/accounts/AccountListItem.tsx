import Typo from "@/components/Typo";
import { colors, radius, spacingX } from "@/constants/theme";
import { AccountType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import { Router } from "expo-router";
import * as Icons from "phosphor-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const AccountListItem = ({
  item,
  index,
  router,
}: {
  item: AccountType;
  index: number;
  router: Router;
}) => {
  const openWallet = () => {
    router.push({
      pathname: "/(modals)/accountModal",
      params: {
        accountId: item?.id,
        accountName: item?.name,
        accountImage: item?.image,
      },
    });
  };
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50)
        .springify()
        .damping(13)}
    >
      <TouchableOpacity style={styles.container} onPress={openWallet}>
        <View style={styles.imageContainer}>
          <Image
            source={item?.image}
            style={{ flex: 1 }}
            contentFit="cover"
            transition={100}
          />
        </View>
        <View style={styles.nameContainer}>
          <Typo size={16}>{item?.name}</Typo>
          <Typo size={14} color={colors.neutral400}>
            {item?.amount}
          </Typo>
        </View>

        <Icons.CaretRightIcon
          size={verticalScale(20)}
          weight="bold"
          color={colors.white}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AccountListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(17),
  },
  imageContainer: {
    height: verticalScale(40),
    width: verticalScale(40),
    borderWidth: 1,
    borderColor: colors.neutral600,
    borderRadius: radius._12,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  nameContainer: {
    flex: 1,
    gap: 2,
    marginLeft: spacingX._10,
  },
});
