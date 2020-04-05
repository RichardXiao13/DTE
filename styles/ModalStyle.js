import { width, rem, shadows } from "../utilities";
import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
    opacity: 0.6,
  },

  signUpContainer: {
    position: "absolute",
    width: width,
    height: (width * 4) / 3,
    bottom: 0,
    backgroundColor: "#FFF",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: rem,
  },

  title: {
    fontSize: (rem * 3) / 2,
    fontWeight: "400",
    marginBottom: rem / 4,
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: rem,
    backgroundColor: "#FFF",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: rem,
    ...shadows,
    shadowColor: "#001D3C",
  },

  signUpButton: {
    width: width / 2,
    height: width / 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(220, 240, 255, 0.8)",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: width,
    ...shadows,
    shadowColor: "#001D3C",
  },

  attendenceButton: {
    width: width / 2,
    height: width / 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 225, 220, 0.9)",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: width,
    ...shadows,
    shadowColor: "#001D3C",
  },

  buttonTitle: {
    fontSize: (rem * 4) / 3,
    fontWeight: "500",
  },
});
