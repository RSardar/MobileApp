import * as React from "react";
import { SafeAreaView, StatusBar } from "react-native";

import Welcome from "../Screens/Welcome";
import Profile from "../Screens/Profile";
import Booking from "../Screens/Booking";
import Dashboard from "../Screens/Dashboard";
import SkipPage from "../Screens/SkipPage";
import CheckOTP from "../Screens/CheckOTP";
import SingleService from "../Screens/SingleService";
import BookAService from "../Screens/Booking/BookAService";
import BookingForm from "../Screens/Booking/BookingForm";
import PublicProfile from "../Screens/Profile/PublicProfile";
import Payment from "../Screens/Payment";
import SingleImage from "../Screens/SingleImage";
import Comment from "../Screens/SingleImage/Comment";
import Icon from "react-native-vector-icons/FontAwesome5";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const BottomTab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

function clickedHome() {
  alert("just Clicked on Home");
}

function clickedBooking() {
  alert("Click on Booking Tab");
}

function WelcomeStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="Booking" component={Booking} />
      <Screen name="BookingForm" component={BookingForm} />
      <Screen name="PublicProfile" component={PublicProfile} />
      <Screen name="SingleImage" component={SingleImage} />
    </Navigator>
  );
}

function BookingStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Booking" component={Booking} />
    </Navigator>
  );
}
function UploadStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="PublicProfile" component={PublicProfile} />
    </Navigator>
  );
}

function ProfileStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}

function MyTabs() {
  return (
    <BottomTab.Navigator
      // initialRouteName="Home"
      // style={styles.bottomNavigatorStyle}
      activeColor="#F54336"
      inactiveColor="black"
      sceneAnimationEnabled={true}
      barStyle={styles.bottomNavigatorStyle}
    >
      <BottomTab.Screen
        name="Welcome"
        component={WelcomeStack}
        options={{
          tabBarLabel: "Home",
          // tabBarOnPress: () => {
          //   this.clickedHome();
          // },
          tabBarIcon: ({ color }) => (
            <Icon style={[styles.bottomTabIcon]} name={"home"} regular />
          ),
        }}
      />
      <BottomTab.Screen
        name="Booking"
        component={BookingStack}
        options={{
          tabBarLabel: "Booking",
          // tabBarOnPress: () => {
          //   this.clickedBooking();
          // },
          tabBarIcon: ({ color }) => (
            <Icon
              style={[styles.bottomTabIcon]}
              name={"calendar-alt"}
              regular
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="PublicProfile"
        component={UploadStack}
        options={{
          tabBarLabel: "Upload",
          tabBarIcon: ({ color }) => (
            <Icon style={[styles.bottomTabIcon]} name={"camera"} regular />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon style={[styles.bottomTabIcon]} name={"user"} solid />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = {
  bottomTabIcon: {
    fontSize: 20,
    color: "#F54336",
  },
  bottomNavigatorStyle: {
    borderWidth: 0.5,
    borderBottomWidth: 1,
    // backgroundColor: "#F54336",
    backgroundColor: "#f7f7ff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "transparent",
    overflow: "hidden",
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "#F54336",
    elevation: 4,
    shadowOpacity: 1.0,
  },
};
export default MyTabs;
