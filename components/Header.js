import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { width, rem } from "../utilities";

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        {this.props.leftIcon}

        <Text style={styles.headerTitle}>{this.props.title}</Text>

        {this.props.button}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    paddingTop: rem * 4,
    paddingBottom: rem,
    shadowColor: "#001D3C",
    shadowOffset: { width: 0, height: rem / 6 },
    shadowOpacity: 0.4,
    shadowRadius: rem / 4,
    elevation: rem / 2
  },

  headerTitle: {
    fontSize: (rem * 3) / 2,
    fontWeight: "500",
    marginHorizontal: rem * 4,
  },
});
