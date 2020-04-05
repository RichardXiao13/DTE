import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Header from "../components/Header";
import LeftArrow from "../components/LeftArrow";
import NameTag from "../components/NameTag";
import Loading from "../components/Loading";
import Fire from "../Fire";

export default class AttendenceScreen extends React.Component {
  state = {
    event: this.props.navigation.state.params.event,
    people: [],
    isRefreshing: false,
    rendered: false,
  };

  getAttendence = async () => {
    const people = await Fire.shared.getAttendence(this.state.event.id);
    people.sort((a, b) => b.name - a.name);
    this.setState({ people, isRefreshing: false, rendered: true });
  };

  renderNameTag = (person) => {
    return <NameTag name={person.name} />;
  };

  componentDidMount() {
    this.getAttendence();
  }

  render() {
    const screen = this.state.rendered ? (
      <View style={styles.container}>
        <Header
          title={this.state.event.event}
          leftIcon={
            <LeftArrow onPress={() => this.props.navigation.goBack()} />
          }
        ></Header>

        <FlatList
          data={this.state.people}
          renderItem={({ item }) => this.renderNameTag(item)}
          keyExtractor={(item, index) => item.name + index}
          refreshing={this.state.isRefreshing}
          onRefresh={() => {
            this.setState({ isRefreshing: true });
            this.getAttendence();
          }}
        />
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
});
