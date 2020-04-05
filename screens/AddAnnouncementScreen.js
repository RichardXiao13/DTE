import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import { width, rem, shadows } from "../utilities";
import Header from "../components/Header";
import Button from "../components/Button";
import LeftArrow from "../components/LeftArrow";
import Fire from "../Fire";

export default class AddAnnouncementScreen extends React.Component {
  state = {
    title: "",
    content: "",
    name: "",
  };

  componentDidMount() {
    Fire.shared.getUser().then((user) => this.setState({ name: user.name }));
  }

  addEvent = async () => {
    if (!this.state.title) {
      Alert.alert(
        "Error",
        "You need to provide a title for the announcement.",
        [
          {
            text: "Ok",
            style: "cancel",
          },
        ]
      );
    } else if (!this.state.content) {
      Alert.alert(
        "Error",
        "You need to provide content for the announcement.",
        [
          {
            text: "Ok",
            style: "cancel",
          },
        ]
      );
    } else {
      Alert.alert("Confirm", "Are you sure?", [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await Fire.shared.addAnnouncement({
                ...this.state,
                timestamp: Fire.shared.timestamp,
              });
              this.props.navigation.goBack();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]);
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={Keyboard.dismiss}
        activeOpacity={1}
      >
        <Header
          title="Add Announcement"
          button={<Button title="Done" onPress={this.addEvent} />}
          leftIcon={
            <LeftArrow onPress={() => this.props.navigation.goBack()} />
          }
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.title}
            placeholder="Title"
            value={this.state.title}
            onChangeText={(title) => this.setState({ title })}
          />

          <TextInput
            style={{ width: width * 0.96 }}
            placeholder="Content"
            multiline
            value={this.state.content}
            onChangeText={(content) => this.setState({ content })}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    width: width,
    padding: rem,
    marginTop: rem,
    marginBottom: width,
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

  icon: {
    position: "absolute",
    padding: rem / 2,
    left: rem / 2,
    bottom: rem / 2,
  },
});
