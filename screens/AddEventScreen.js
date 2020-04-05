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
import moment from "moment";

export default class AddEventScreen extends React.Component {
  state = {
    event: "",
    description: "",
    date: "",
  };

  addEvent = async () => {
    if (!moment(this.state.date, "MM/DD/YYYY", true).isValid()) {
      Alert.alert("Error", "The date you entered should be in\nMM/DD/YYYY.", [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);
    } else if (!this.state.event) {
      Alert.alert("Error", "You need to provide a name for the event.", [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);
    } else if (!this.state.description) {
      Alert.alert("Error", "You need to provide a description of the event.", [
        {
          text: "Ok",
          style: "cancel",
        },
      ]);
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
              await Fire.shared.addEvent(this.state);
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
          title="Add Event"
          button={<Button title="Done" onPress={this.addEvent} />}
          leftIcon={<LeftArrow onPress={() => this.props.navigation.goBack()}/>}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.title}
            placeholder="Event Name"
            value={this.state.event}
            onChangeText={(event) => this.setState({ event })}
          />

          <TextInput
            style={styles.title}
            placeholder="Date MM/DD/YYYY"
            value={this.state.date}
            onChangeText={(date) => this.setState({ date })}
          />

          <TextInput
            style={{ width: width * 0.96 }}
            placeholder="Description"
            multiline
            value={this.state.description}
            onChangeText={(description) => this.setState({ description })}
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
});
