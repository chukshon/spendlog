import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useRef } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";

const Register = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const router = useRouter();

  const { register: registerUser, isRegistering } = useAuth();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign up, Please fill in all fields");
      return;
    }

    const res = await registerUser(
      emailRef.current,
      passwordRef.current,
      nameRef.current
    );

    if (!res.success) {
      Alert.alert("Register", res.msg);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Let's
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Get Started
          </Typo>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Create an account to track your expenses and log all your budgets
          </Typo>
          {/* Name */}
          <Input
            onChangeText={(text) => (nameRef.current = text)}
            placeholder="Enter your name"
            icon={
              <Icons.UserIcon
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          {/* Email */}
          <Input
            onChangeText={(text) => (emailRef.current = text)}
            placeholder="Enter your email"
            icon={
              <Icons.AtIcon
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          {/* Password */}
          <Input
            onChangeText={(text) => (passwordRef.current = text)}
            placeholder="Enter your password"
            icon={
              <Icons.LockIcon
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <Button
            loading={isRegistering}
            onPress={handleSubmit}
            style={{ marginTop: spacingY._20 }}
          >
            <Typo size={21} color={colors.black} fontWeight={"700"}>
              Register
            </Typo>
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Typo size={15}>Alreadt have an account?</Typo>
          <Pressable onPress={() => router.navigate("/(auth)/login" as any)}>
            <Typo size={15} fontWeight={"700"} color={colors.primary}>
              Login Up
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
