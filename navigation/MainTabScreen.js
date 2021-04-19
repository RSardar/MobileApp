import * as React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import Welcome from "../Screens/Welcome";
import Profile from "../Screens/Profile";
import Setting from "../Screens/Profile/Settings";
import Security from "../Screens/Profile/Security";
import Booking from "../Screens/Booking";
import EditProfile from "../Screens/Profile/EditProfile";
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
import Order from "../Screens/Order";
import BookingWelcome from "../Screens/BookingWelcome";
import ClientProfile from "../Screens/Profile/ClientProfile";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ClientOrder from "../Screens/Order/ClientOrder";
import SingleOrderDetails from "../Screens/Order/SingleOrderDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const BottomTab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

// function getHeaderTitle(route) {
//   const routeName = getFocusedRouteNameFromRoute(route);

//   return routeName;
// }

export default class MyTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // userId: "",
      userType: "",
      photographerType: false,
      storeLoad: false,
    };
  }
  componentDidMount() {
    this.userIdStored();
  }

  userIdStored = async () => {
    try {
      let photographerType = await AsyncStorage.getItem("photographer");
      photographerType = JSON.parse(photographerType);
      console.log(photographerType);
      this.setState({
        photographerType: photographerType,
        storeLoad: true,
      });
    } catch (e) {
      console.log("error");
    }
  };

  WelcomeStack = () => {
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
  };

  ProfileStack = () => {
    return (
      <Navigator>
        <Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
        />

        <Screen name="Setting" component={Setting} />
        <Screen name="Security" component={Security} />
        <Screen
          options={{ title: "Edit Profile" }}
          name="EditProfile"
          component={EditProfile}
        />
        <Screen
          options={{ title: "CheckOTP" }}
          name="CheckOTP"
          component={CheckOTP}
        />
        <Screen
          options={{ title: "Order Details" }}
          name="Order"
          component={Order}
        />
        <Screen
          options={{ title: "My Orders" }}
          name="ClientOrder"
          component={ClientOrder}
        />
        <Screen
          options={{ title: "Order Details" }}
          name="SingleOrderDetails"
          component={SingleOrderDetails}
        />
      </Navigator>
    );
  };

  commonStack = () => {
    return (
      <View>
        <Screen name="BookingWelcome" component={BookingWelcome} />
        <Screen name="Booking" component={Booking} />
        <Screen name="BookingForm" component={BookingForm} />
        <Screen name="PublicProfile" component={PublicProfile} />
        <Screen name="SingleImage" component={SingleImage} />
      </View>
    );
  };

  BookingStack = () => {
    return (
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="BookingWelcome" component={BookingWelcome} />
        {this.commonStack}
      </Navigator>
    );
  };

  OrderStack = () => {
    return (
      <Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Screen
          options={{
            headerTitle: "Order Details",
            headerBackTitleVisible: false,
            headerLeft: null,
          }}
          name="Order"
          component={Order}
        />
        {commonStack}
      </Navigator>
    );
  };

  UploadStack = () => {
    return (
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="PublicProfile" component={PublicProfile} />
      </Navigator>
    );
  };

  render() {
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
          component={this.WelcomeStack}
          options={{
            tabBarLabel: "Home",
            // tabBarOnPress: () => {
            //   this.clickedHome();
            // },
            tabBarIcon: ({ color }) => (
              <Icon
                style={[styles.bottomTabIcon]}
                name={"home-outline"}
                type="ionicon"
              />
            ),
          }}
        />
        {this.state.photographerType ? (
          <BottomTab.Screen
            name="Booking"
            component={this.BookingStack}
            options={{
              tabBarLabel: "Booking",
              // tabBarOnPress: () => {
              //   this.clickedBooking();
              // },
              tabBarIcon: ({ color }) => (
                <Icon
                  style={[styles.bottomTabIcon]}
                  name={"reader-outline"}
                  type="ionicon"
                />
              ),
            }}
          />
        ) : (
          <BottomTab.Screen
            name="Order"
            component={this.OrderStack}
            options={{
              tabBarLabel: "Order",
              // tabBarOnPress: () => {
              //   this.clickedBooking();
              // },
              tabBarIcon: ({ color }) => (
                <Icon
                  style={[styles.bottomTabIcon]}
                  name={"reader-outline"}
                  type="ionicon"
                />
              ),
            }}
          />
        )}

        <BottomTab.Screen
          name="PublicProfile"
          component={this.UploadStack}
          options={{
            tabBarLabel: "Upload",
            tabBarIcon: ({ color }) => (
              <Icon
                style={[styles.bottomTabIcon]}
                name={"camera-outline"}
                type="ionicon"
              />
            ),
          }}
        />

        <BottomTab.Screen
          name="Profile"
          component={this.ProfileStack}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <Icon
                style={[styles.bottomTabIcon]}
                color={color}
                name={"person-outline"}
                type="ionicon"
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  }
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
// export default MyTabs;
