import { colors, radius } from "@/constants/theme";
import { CustomButtonProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Loading from "./Loading";

const Button = ({
  onPress,
  style,
  children,
  loading = false,
}: CustomButtonProps) => {
  if (loading) {
    return (
      <View style={[styles.button, style, { backgroundColor: "transparent" }]}>
        <Loading />
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: radius._17,
    borderCurve: "continuous",
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
  },
});
