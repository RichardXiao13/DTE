import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Fire from "../Fire";
import { width, rem, shadows } from "../utilities";

console.disableYellowBox = true;

export default class LoginScreen extends React.Component {
  signIn = async () => {
    await Fire.shared.signInWithGoogle();
    this.props.navigation.navigate("App");
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Welcome!</Text>
        </View>

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/DTELogo.png")}
          />
        </View>

        <View style={styles.signInContainer}>
          <View style={styles.vhhsContainer}>
            <Image style={styles.vhhs} source={require("../assets/vhhs.png")} />
          </View>

          <TouchableOpacity
            style={styles.signInButton}
            activeOpacity={0.7}
            onPress={this.signIn}
          >
            <Image
              style={styles.google}
              source={require("../assets/google.png")}
            />

            <Text style={styles.signIn}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 53, 110, 0.9)",
    alignItems: "center",
    justifyContent: "space-around",
  },

  welcomeContainer: {
    width: width * 0.96,
    height: (width * 0.96 * 11) / 30,
    borderWidth: 1,
    borderColor: "#707070",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    ...shadows,
  },

  welcome: {
    fontSize: 3 * rem,
    fontWeight: "bold",
  },

  logoContainer: {
    ...shadows,
    elevation: 5,
  },

  logo: {
    width: width * 0.96,
    height: (width * 0.96 * 5) / 9,
    borderWidth: 1,
    borderColor: "#707070",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  signInContainer: {
    width: width * 0.96,
    height: width * 0.96,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#707070",
    alignItems: "center",
    justifyContent: "space-evenly",
    ...shadows,
    elevation: 5,
  },

  vhhsContainer: {
    width: (width * 26) / 75,
    height: (width * 26) / 75,
    borderRadius: width,
    borderWidth: 1,
    borderColor: "#707070",
    opacity: 0.75,
    justifyContent: "center",
    alignItems: "center",
    ...shadows,
    elevation: 5,
  },

  vhhs: {
    width: (width * 22) / 75,
    height: (width * 22) / 75,
    marginTop: rem / 2,
    marginRight: rem / 2,
    ...shadows,
  },

  signInButton: {
    flexDirection: "row",
    width: (width * 64) / 75,
    height: (((width * 64) / 75) * 7) / 32,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderRadius: (rem * 9) / 4,
    borderColor: "#707070",
    ...shadows,
    elevation: 5,
  },

  google: {
    width: (width * 18) / 125,
    height: (width * 18) / 125,
  },

  signIn: {
    fontSize: (rem * 13) / 8,
    fontWeight: "500",
    color: "#707070",
  },
});
