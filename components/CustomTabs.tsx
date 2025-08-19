import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Icons from "phosphor-react-native";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export default function CustomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const tabBarIcons: any = {
    index: (isfocused: boolean) => {
      <Icons.HouseIcon
        size={verticalScale(30)}
        weight={isfocused ? "fill" : "regular"}
        color={isfocused ? colors.primary : colors.neutral400}
      />;
    },
    statistics: (isfocused: boolean) => {
      <Icons.ChartBarIcon
        size={verticalScale(30)}
        weight={isfocused ? "fill" : "regular"}
        color={isfocused ? colors.primary : colors.neutral400}
      />;
    },
    account: (isfocused: boolean) => {
      <Icons.WalletIcon
        size={verticalScale(30)}
        weight={isfocused ? "fill" : "regular"}
        color={isfocused ? colors.primary : colors.neutral400}
      />;
    },
    profile: (isfocused: boolean) => {
      <Icons.UserIcon
        size={verticalScale(30)}
        weight={isfocused ? "fill" : "regular"}
        color={isfocused ? colors.primary : colors.neutral400}
      />;
    },
  };
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {tabBarIcons[route.name] && tabBarIcons[route.name](isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS == "ios" ? verticalScale(73) : verticalScale(55),
    backgroundColor: colors.neutral800,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.neutral700,
  },
  tabBarItem: {
    marginBottom: Platform.OS == "ios" ? spacingY._10 : spacingY._5,
    justifyContent: "center",
    alignItems: "center",
  },
});
