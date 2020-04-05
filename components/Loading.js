import React from "react";
import {StyleSheet, View, ActivityIndicator} from "react-native";

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF"
  }
});