import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { width, rem, shadows } from "../utilities";
import moment from "moment";

export default class Announcement extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>

        <Text style={styles.content}>{this.props.content}</Text>

        <View style={styles.info}>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.timestamp}>
            {" "}
            posted {moment(this.props.timestamp).fromNow()}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: width,
    padding: rem,
    backgroundColor: "#FFF",
    marginVertical: rem / 4,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderTopColor: "#E0E0E0",
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: "#E0E0E0",
    ...shadows,
  },

  title: {
    fontSize: rem,
    fontWeight: "500",
  },

  content: {
    paddingVertical: rem / 2,
  },

  info: {
    flexDirection: "row",
  },

  name: {
    fontWeight: "500",
  },

  timestamp: {
    color: "#7A7A7A",
  },
});
