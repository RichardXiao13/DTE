import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { rem } from "../utilities";

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.6} onPress={this.props.onPress}>
        <Text style={styles.buttonTitle}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    padding: rem / 2,
    right: rem / 2,
    bottom: rem / 2,
  },

  buttonTitle: {
    color: "#000",
    fontSize: rem,
    fontWeight: "500",
  },
});
