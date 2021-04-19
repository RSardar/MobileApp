// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack'
import MainTabNavigator from "./MainTabNavigator";

import { createAppContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default createStackNavigator({
  Main: MainTabNavigator,
});
