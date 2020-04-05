import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Text,
  Alert,
} from "react-native";
import Header from "../components/Header";
import ScheduleItem from "../components/ScheduleItem";
import Loading from "../components/Loading";
import ModalStyle from "../styles/ModalStyle";
import { Ionicons } from "@expo/vector-icons";
import { width, rem } from "../utilities";
import Fire from "../Fire";

export default class ProfileScreen extends React.Component {
  state = {
    schedule: [],
    isRefreshing: false,
    visible: false,
    event: {},
    rendered: false,
    visible2: false,
    admin: false,
  };
  handleRemove = () => {
    Alert.alert("Remove", "Are you sure?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await Fire.shared.cancelSignUp(this.state.event.id);
          this.getPersonalSchedule();
          this.setState({ visible: false });
        },
      },
    ]);
  };

  getPersonalSchedule = async () => {
    const schedule = await Fire.shared.personalSchedule();
    schedule.sort((a, b) => new Date(b.date) - new Date(a.date));
    this.setState({ schedule, isRefreshing: false, rendered: true });
  };

  renderSchedule = (event) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.setState({ visible: true, event })}
      >
        <ScheduleItem
          title={event.event}
          date={event.date}
          description={event.description}
        />
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    Fire.shared.getUser().then((user) => this.setState({ admin: user.admin }));
    this.getPersonalSchedule();
  }

  render() {
    const settings = this.state.admin ? (
      <TouchableOpacity
        style={styles.settings}
        onPress={() => this.setState({ visible2: true })}
      >
        <Ionicons name="ios-settings" size={32} />
      </TouchableOpacity>
    ) : null;
    let screen = this.state.rendered ? (
      <View style={styles.container}>
        <Header title="Profile" button={settings} />
        <FlatList
          data={this.state.schedule}
          renderItem={({ item }) => this.renderSchedule(item)}
          keyExtractor={(item, index) => item.event + index}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.isRefreshing}
          onRefresh={() => {
            this.setState({ isRefreshing: true });
            this.getPersonalSchedule();
          }}
        />

        <Modal visible={this.state.visible} transparent animationType="fade">
          <TouchableOpacity
            style={ModalStyle.modalContainer}
            activeOpacity={0.6}
            onPress={() => this.setState({ visible: false })}
          ></TouchableOpacity>

          <View style={ModalStyle.signUpContainer}>
            <View style={ModalStyle.contentContainer}>
              <Text style={ModalStyle.title}>{this.state.event.event}</Text>

              <Text style={ModalStyle.title}>{this.state.event.date}</Text>

              <Text>{this.state.event.description}</Text>
            </View>

            <TouchableOpacity
              style={ModalStyle.attendenceButton}
              activeOpacity={0.6}
              onPress={() => {
                this.setState({ visible: false });
                this.props.navigation.navigate("Attendence", {
                  event: this.state.event,
                });
              }}
            >
              <Text style={ModalStyle.buttonTitle}>Attendence</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={ModalStyle.signUpButton}
              activeOpacity={0.6}
              onPress={this.handleRemove}
            >
              <Text style={ModalStyle.buttonTitle}>Remove</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal visible={this.state.visible2} transparent animationType="fade">
          <TouchableOpacity
            style={ModalStyle.modalContainer}
            activeOpacity={0.6}
            onPress={() => this.setState({ visible2: false })}
          ></TouchableOpacity>

          <View style={{ ...ModalStyle.signUpContainer, height: width }}>
            <TouchableOpacity
              style={ModalStyle.attendenceButton}
              activeOpacity={0.6}
              onPress={() => {
                this.setState({ visible2: false });
                this.props.navigation.navigate("Settings", {
                  title: "Remove Admin",
                });
              }}
            >
              <Text style={ModalStyle.buttonTitle}>Remove Admin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={ModalStyle.signUpButton}
              activeOpacity={0.6}
              onPress={() => {
                this.setState({ visible2: false });
                this.props.navigation.navigate("Settings", {
                  title: "Add Admin",
                });
              }}
            >
              <Text style={ModalStyle.buttonTitle}>Add Admin</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    ) : (
      <Loading />
    );
    return screen;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  settings: {
    position: "absolute",
    padding: rem / 2,
    right: rem / 2,
    bottom: rem / 2,
  },
});
