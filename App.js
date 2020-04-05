import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";

import ScheduleScreen from "./screens/ScheduleScreen";
import AddEventScreen from "./screens/AddEventScreen";

import ProfileScreen from "./screens/ProfileScreen";
import AttendenceScreen from "./screens/AttendenceScreen";
import AdminSettingsScreen from "./screens/AdminSettingsScreen";

import AnnouncementsScreen from "./screens/AnnouncementsScreen";
import AddAnnouncementScreen from "./screens/AddAnnouncementScreen";

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Schedule: {
          screen: ScheduleScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons
                name="ios-calendar"
                size={30}
                color={tintColor}
              ></Ionicons>
            ),
          },
        },

        Announcements: {
          screen: AnnouncementsScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons
                name="ios-notifications"
                size={30}
                color={tintColor}
              ></Ionicons>
            ),
          },
        },

        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="md-person" size={30} color={tintColor}></Ionicons>
            ),
          },
        },
      },

      {
        tabBarOptions: {
          activeTintColor: "#171717",
          inactiveTintColor: "#B8BBC4",
          showLabel: false,
        },
        initialRouteName: "Schedule",
      }
    ),

    AddEvent: {
      screen: AddEventScreen,
    },

    AddAnnouncement: {
      screen: AddAnnouncementScreen,
    },

    Attendence: {
      screen: AttendenceScreen,
    },

    Settings: {
      screen: AdminSettingsScreen
    }
  },

  {
    mode: "modal",
    headerMode: "none",
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: LoginScreen,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
