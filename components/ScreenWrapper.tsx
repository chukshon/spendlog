import { colors } from "@/constants/theme";
import { ScreenWrapperProps } from "@/types";
import React from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const height = Dimensions.get("window").height;

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  return (
    <View style={[styles.container, style]}>
      <StatusBar barStyle="light-content" />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? height * 0.06 : 50,
    backgroundColor: colors.neutral900,
  },
});
