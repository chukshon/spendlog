import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={() => handleLogout()}>
        <Typo>Logout</Typo>
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
