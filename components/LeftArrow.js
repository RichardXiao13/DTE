import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { rem } from "../utilities";

export default class LeftArrow extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.icon}
        activeOpacity={0.6}
        onPress={this.props.onPress}
      >
        <Ionicons name="ios-arrow-back" size={24} />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    padding: rem / 2,
    left: rem / 2,
    bottom: rem / 2,
  },
});
