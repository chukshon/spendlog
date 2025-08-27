import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { getProfileImage } from "@/services/imageService";
import { profileOptionType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const Profile = () => {
  const { user, handleLogout } = useAuth();

  const router = useRouter();

  const profileOptions: profileOptionType[] = [
    {
      title: "Edit Profile",
      icon: <Icons.UserIcon size={26} color={colors.white} weight="fill" />,
      routeName: "/(modals)/profileModal",
      bgColor: "#6366f1",
    },
    {
      title: "Settings",
      icon: <Icons.GearSixIcon size={26} color={colors.white} weight="fill" />,
      bgColor: "#059669",
    },
    {
      title: "Privacy Policy ",
      icon: <Icons.LockIcon size={26} color={colors.white} weight="fill" />,
      bgColor: colors.neutral600,
    },
    {
      title: "Logout",
      icon: <Icons.PowerIcon size={26} color={colors.white} weight="fill" />,
      bgColor: "#e11d48",
    },
  ];

  const handleShowLogoutAlert = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {
          console.log("cancel");
        },
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          handleLogout();
        },
      },
    ]);
  };
  const handleSelectAccountOption = (item: profileOptionType) => {
    if (item.title === "Logout") {
      handleShowLogoutAlert();
    }

    if (item.routeName) {
      router.push(item.routeName);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <Header
          title="Profile"
          style={{
            marginVertical: spacingY._10,
          }}
        />

        {/* User Info */}
        <View style={styles.userInfo}>
          {/* Avatar */}
          <View>
            {/* User Image */}
            <Image
              source={getProfileImage(user?.image)}
              style={styles.avatar}
              contentFit="cover"
              transition={100}
            />
          </View>

          {/* Name and Email */}
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight="600" color={colors.neutral100}>
              {user?.name}
            </Typo>
            <Typo size={15} color={colors.neutral400}>
              {user?.email}
            </Typo>
          </View>

          {/* Account Options */}
          <View style={styles.accountOptions}>
            {profileOptions.map((option, index) => (
              <Animated.View
                entering={FadeInDown.delay(index * 50)
                  .springify()
                  .damping(14)}
                style={styles.listItem}
              >
                <TouchableOpacity
                  key={index}
                  style={styles.flexRow}
                  onPress={() => handleSelectAccountOption(option)}
                >
                  <View
                    style={[
                      styles.listIcon,
                      {
                        backgroundColor: option?.bgColor,
                      },
                    ]}
                  >
                    {option.icon && option.icon}
                  </View>
                  <Typo size={16} style={{ flex: 1 }} fontWeight="500">
                    {option.title}
                  </Typo>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 8,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    padding: 5,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});
