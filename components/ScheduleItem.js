import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { width, rem, shadows } from "../utilities";

export default class ScheduleItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>

        <Text style={styles.title}>{this.props.date}</Text>

        <Text>{this.props.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    width: width,
    padding: rem,
    marginVertical: rem / 4,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderTopColor: "#E0E0E0",
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: "#E0E0E0",
    ...shadows,
  },

  title: {
    fontSize: (rem * 3) / 2,
    fontWeight: "400",
    marginBottom: rem / 4,
  },
});
