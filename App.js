import * as React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Welcome from "./Screens/Welcome";
import BookingForm from "./Screens/Booking/BookingForm";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTab from "./navigation/MainTabScreen";
// import MainTabScreen from "./components/MainTabScreen";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const Home = () => {
    return (
      <Tab.Navigator headerMode="none">
        {<Tab.Screen name="bottom" component={BottomTab} />}
        <Tab.Screen name="BottomTab" component={BottomTab} />
      </Tab.Navigator>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Welcome"
            component={BottomTab}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  bottomTabIcon: {
    fontSize: 20,
  },
};

export default App;
