import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const rem = (width * 16) / 375;
const shadows = {
  shadowColor: "#000",
  shadowOffset: { width: 1, height: rem / 6 },
  shadowOpacity: 0.8,
  shadowRadius: rem / 8,
  elevation: rem / 2,
};

export { width, rem, shadows };
