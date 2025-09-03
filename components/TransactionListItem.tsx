import { TransactionItemProps } from "@/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TransactionListItem = ({
  item,
  index,
  handleClick,
}: TransactionItemProps) => {
  return (
    <View>
      <Text>Transaction Item</Text>
    </View>
  );
};

export default TransactionListItem;

const styles = StyleSheet.create({});
