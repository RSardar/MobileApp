import * as React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Welcome from "./Screens/Welcome";
import Profile from "./Screens/Profile";
import Booking from "./Screens/Booking";
import Dashboard from "./Screens/Dashboard";
import SkipPage from "./Screens/SkipPage";
import CheckOTP from "./Screens/CheckOTP";
import SingleService from "./Screens/SingleService";
import BookAService from "./Screens/Booking/BookAService";
import BookingForm from "./Screens/Booking/BookingForm";
import PublicProfile from "./Screens/Profile/PublicProfile";
import Payment from "./Screens/Payment";
import SingleImage from "./Screens/SingleImage";
import Comment from "./Screens/SingleImage/Comment";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import MainTabScreen from "./components/MainTabScreen";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function WelcomeStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="PublicProfile" component={PublicProfile} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen name="SingleImage" component={SingleImage} />

          <Stack.Screen name="Booking" component={Booking} />
          <Stack.Screen name="BookingForm" component={BookingForm} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SkipPage" component={SkipPage} />
          <Stack.Screen name="CheckOTP" component={CheckOTP} />
          <Stack.Screen name="SingleService" component={SingleService} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
  },
};

export default App;
