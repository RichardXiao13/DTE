import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import Header from "../components/Header";
import Announcement from "../components/Announcement";
import Button from "../components/Button";
import Loading from "../components/Loading";
import ModalStyle from "../styles/ModalStyle";
import { Ionicons } from "@expo/vector-icons";
import { width, rem } from "../utilities";
import Fire from "../Fire";

export default class AnnouncementsScreen extends React.Component {
  state = {
    isRefreshing: false,
    announcements: [],
    rendered: false,
    admin: false,
    visible: false,
    announcement: {},
  };

  getAnnouncements = async () => {
    let announcements = await Fire.shared.firestore
      .collection("announcements")
      .get();
    announcements = announcements.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    announcements.sort((a, b) => b.timestamp - a.timestamp);
    this.setState({ isRefreshing: false, announcements, rendered: true });
  };

  handleDelete = () => {
    Alert.alert("Delete Announcement", "Are you sure?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await Fire.shared.deleteAnnouncement(this.state.announcement.id);
          this.getAnnouncements();
          this.setState({ visible: false });
        },
      },
    ]);
  };

  renderAnnouncement = (announcement) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.setState({ visible: true, announcement })}
      >
        <Announcement
          title={announcement.title}
          content={announcement.content}
          timestamp={announcement.timestamp}
          name={announcement.name}
        />
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    Fire.shared.getUser().then((user) => this.setState({ admin: user.admin }));
    this.getAnnouncements();
  }

  render() {
    const screen = this.state.rendered ? (
      <View style={styles.container}>
        <Header
          title="Announcements"
          button={
            this.state.admin ? (
              <Button
                title="Add"
                onPress={() =>
                  this.props.navigation.navigate("AddAnnouncement")
                }
              />
            ) : null
          }
        />

        <FlatList
          style={{ width: width }}
          data={this.state.announcements}
          renderItem={({ item }) => this.renderAnnouncement(item)}
          keyExtractor={(item, index) => item.title + index}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.isRefreshing}
          onRefresh={() => {
            this.setState({ isRefreshing: true });
            this.getAnnouncements();
          }}
        />

        <Modal visible={this.state.visible} transparent animationType="fade">
          <TouchableOpacity
            style={ModalStyle.modalContainer}
            activeOpacity={0.6}
            onPress={() => this.setState({ visible: false })}
          ></TouchableOpacity>

          <View
            style={{
              ...ModalStyle.signUpContainer,
              height: width,
              justifyContent: "center",
            }}
          >
            {this.state.admin ? (
              <TouchableOpacity
                onPress={this.handleDelete}
                style={styles.trash}
              >
                <Ionicons name="ios-trash" size={32} />
              </TouchableOpacity>
            ) : null}

            <Announcement
              title={this.state.announcement.title}
              content={this.state.announcement.content}
              timestamp={this.state.announcement.timestamp}
              name={this.state.announcement.name}
            />
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

  trash: {
    position: "relative",
    bottom: rem * 2,
  },
});
