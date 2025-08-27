import Typo from "@/components/Typo";
import { colors, radius } from "@/constants/theme";
import { getFilePath } from "@/services/imageService";
import { ImageUploadProps } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as Icons from "phosphor-react-native";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const ImageUpload = ({
  file,
  onSelect,
  onClear,
  containerStyle,
  imageStyle,
  placeholder,
}: ImageUploadProps) => {
  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      onSelect(result.assets[0]);
    }
  };
  return (
    <View>
      {!file && (
        <EmptyImageUploadState
          onPress={onPickImage}
          containerStyle={containerStyle}
          placeholder={placeholder}
        />
      )}
      {file && <FilledImageUploadState file={file} imageStyle={imageStyle} />}
    </View>
  );
};

export default ImageUpload;

export const EmptyImageUploadState = ({
  containerStyle,
  placeholder,
  onPress,
}: {
  containerStyle: StyleProp<ViewStyle>;
  placeholder?: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.inputContainer, containerStyle && containerStyle]}
    >
      <Icons.UploadSimpleIcon color={colors.neutral200} />
      {placeholder && (
        <Typo color={colors.neutral200} size={15}>
          {placeholder}
        </Typo>
      )}
    </TouchableOpacity>
  );
};

export const FilledImageUploadState = ({
  imageStyle,
  file,
}: {
  imageStyle?: StyleProp<ViewStyle>;
  file: any;
}) => {
  return (
    <View style={[styles.image, imageStyle && imageStyle]}>
      <Image
        style={{ flex: 1 }}
        source={getFilePath(file)}
        contentFit="cover"
        transition={100}
      />
      <TouchableOpacity style={styles.deleteIcon}>
        <Icons.XCircleIcon
          color={colors.white}
          size={verticalScale(24)}
          weight="fill"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: verticalScale(54),
    backgroundColor: colors.neutral800,
    borderRadius: radius._15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.neutral500,
    borderStyle: "dashed",
  },
  image: {
    height: scale(150),
    width: scale(150),
    borderRadius: radius._15,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  deleteIcon: {},
});
