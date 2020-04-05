import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Text,
  Alert,
  Image,
} from "react-native";
import Header from "../components/Header";
import Button from "../components/Button";
import ScheduleItem from "../components/ScheduleItem";
import Loading from "../components/Loading";
import { width, rem, shadows } from "../utilities";
import ModalStyle from "../styles/ModalStyle";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";

export default class ScheduleScreen extends React.Component {
  state = {
    schedule: [],
    visible: false,
    event: {},
    isRefreshing: false,
    rendered: false,
    admin: false,
  };

  handleSignUp = () => {
    Alert.alert("Sign Up", "Are you sure?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          Fire.shared.signUp(this.state.event.id);
          this.setState({ visible: false });
        },
      },
    ]);
  };

  handleDelete = () => {
    Alert.alert("Delete Event", "Are you sure?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await Fire.shared.deleteEvent(this.state.event.id);
          this.getSchedule();
          this.setState({ visible: false });
        },
      },
    ]);
  };

  getSchedule = async () => {
    let schedule = await Fire.shared.firestore.collection("schedule").get();
    schedule = schedule.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    schedule.sort((a, b) => new Date(b.date) - new Date(a.date));
    this.setState({ isRefreshing: false, schedule, rendered: true });
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
    this.getSchedule();
  }

  render() {
    const screen = this.state.rendered ? (
      <View style={styles.container}>
        <Header
          title="Schedule"
          button={
            this.state.admin ? (
              <Button
                title="Add Event"
                onPress={() => this.props.navigation.navigate("AddEvent")}
              />
            ) : null
          }
        />

        <FlatList
          ListHeaderComponent={
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/DTELogo.png")}
                style={styles.logo}
              />
            </View>
          }
          style={{ width: width }}
          data={this.state.schedule}
          renderItem={({ item }) => this.renderSchedule(item)}
          keyExtractor={(item, index) => item.event + index}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.isRefreshing}
          onRefresh={() => {
            this.setState({ isRefreshing: true });
            this.getSchedule();
          }}
        />

        <Modal visible={this.state.visible} transparent animationType="fade">
          <TouchableOpacity
            style={ModalStyle.modalContainer}
            activeOpacity={0.6}
            onPress={() => this.setState({ visible: false })}
          ></TouchableOpacity>

          <View style={ModalStyle.signUpContainer}>
            {this.state.admin ? (
              <TouchableOpacity onPress={this.handleDelete}>
                <Ionicons name="ios-trash" size={32} />
              </TouchableOpacity>
            ) : null}

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
              onPress={this.handleSignUp}
            >
              <Text style={ModalStyle.buttonTitle}>Sign Up</Text>
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
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  logoContainer: {
    ...shadows,
  },

  logo: {
    width: width,
    height: (width * 0.96 * 5) / 9,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: rem / 2,
  },
});
