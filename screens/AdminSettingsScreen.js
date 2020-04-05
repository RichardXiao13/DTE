import React from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import Header from "../components/Header";
import LeftArrow from "../components/LeftArrow";
import NameTag from "../components/NameTag";
import { SearchBar } from "react-native-elements";
import Loading from "../components/Loading";
import Fire from "../Fire";

export default class AdminSettingsScreen extends React.Component {
  state = {
    title: this.props.navigation.state.params.title,
    all: [],
    possible: [],
    user: "",
    rendered: false,
  };

  handleDelete = (id) => {
    Alert.alert("Remove Admin", "Are you sure?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          Fire.shared.removeAdmin(id);
          this.props.navigation.goBack();
        },
      },
    ]);
  };

  handleAdd = (id) => {
    Alert.alert("Add Admin", "Are you sure?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          Fire.shared.addAdmin(id);
          this.props.navigation.goBack();
        },
      },
    ]);
  };

  handleSearch = () => {
    const search = this.state.user;
    const possible = this.state.all.map((user) => {
      if (user && user.name.startsWith(search)) {
        return user;
      }
    });
    this.setState({ possible });
  };

  renderName = (user) => {
    const item = user ? (
      <TouchableOpacity
        onPress={
          this.state.title === "Add Admin"
            ? () => this.handleAdd(user.id)
            : () => this.handleDelete(user.id)
        }
      >
        <NameTag name={user.name} />
      </TouchableOpacity>
    ) : null;
    return item;
  };

  getNames = () => {
    Fire.shared.firestore
      .collection("users")
      .get()
      .then((snapshot) => {
        let users;
        if (this.state.title === "Add Admin") {
          users = snapshot.docs.map((doc) => {
            const data = doc.data();
            if (!data.admin) {
              return { ...data, id: doc.id };
            }
          });
        } else {
          users = snapshot.docs.map((doc) => {
            const data = doc.data();
            if (data.admin) {
              return { ...data, id: doc.id };
            }
          });
        }
        this.setState({ all: users, possible: users, rendered: true });
      });
  };

  componentDidMount() {
    this.getNames();
  }

  render() {
    const screen = this.state.rendered ? (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={Keyboard.dismiss}
      >
        <Header
          title={this.state.title}
          leftIcon={
            <LeftArrow onPress={() => this.props.navigation.goBack()} />
          }
        />

        <SearchBar
          platform="ios"
          containerStyle={{ backgroundColor: "#FFF" }}
          placeholder="Search User"
          cancelButtonProps={{ color: "#000" }}
          inputContainerStyle={{ backgroundColor: "#ECECEC" }}
          value={this.state.user}
          onChangeText={(user) => {
            if (!user) {
              this.getNames();
            }
            this.setState({ user });
            this.handleSearch();
          }}
        />

        <FlatList
          data={this.state.possible}
          renderItem={({ item }) => this.renderName(item)}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </TouchableOpacity>
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
