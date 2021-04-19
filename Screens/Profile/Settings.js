import React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { Icon, Divider } from "react-native-elements";
// const serverIp = `betterpiping.com`;
// const fileFolder = `jsonClasses`;
const serverIp = `192.168.0.119`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
export default class Setting extends React.Component {
  ProfilePage = () => {
    alert("hello");
  };
  EditProfilePage = () => {
    console.log("hello");
    this.props.navigation.navigate("EditProfile");
  };
  render() {
    return (
      <View style={styles.mainBody}>
        <TouchableHighlight
          underlayColor="#DDDDDD"
          style={[styles.commonFlex, styles.eachSetting]}
          onPress={() => this.props.navigation.navigate("EditProfile")}
        >
          <View style={[styles.commonFlex]}>
            <Icon name={"person-circle-outline"} type="ionicon" color="#f50" />
            <View style={styles.settingTextBox}>
              <Text style={styles.settingText}>Profile</Text>
            </View>
          </View>
        </TouchableHighlight>
        <Divider />
        <TouchableHighlight
          underlayColor="#DDDDDD"
          style={[styles.commonFlex, styles.eachSetting]}
          onPress={() => this.privacy()}
        >
          <View style={[styles.commonFlex]}>
            <Icon name={"lock-closed-outline"} type="ionicon" color="#f50" />
            <View style={styles.settingTextBox}>
              <Text style={styles.settingText}>Privacy</Text>
            </View>
          </View>
        </TouchableHighlight>
        <Divider />
        <TouchableHighlight
          underlayColor="#DDDDDD"
          style={[styles.commonFlex, styles.eachSetting]}
          onPress={() => this.props.navigation.navigate("Security")}
        >
          <View style={[styles.commonFlex]}>
            <Icon
              name={"shield-checkmark-outline"}
              type="ionicon"
              color="#f50"
            />
            <View style={styles.settingTextBox}>
              <Text style={styles.settingText}>security</Text>
            </View>
          </View>
        </TouchableHighlight>
        <Divider />
        <TouchableHighlight
          underlayColor="#DDDDDD"
          style={[styles.commonFlex, styles.eachSetting]}
        >
          <View style={[styles.commonFlex]}>
            <Icon name={"help-buoy"} type="ionicon" color="#f50" />
            <View style={styles.settingTextBox}>
              <Text style={styles.settingText}>help</Text>
            </View>
          </View>
        </TouchableHighlight>
        <Divider />
        <TouchableHighlight
          underlayColor="#DDDDDD"
          style={[styles.commonFlex, styles.eachSetting]}
        >
          <View style={[styles.commonFlex]}>
            <Icon
              name={"information-circle-outline"}
              type="ionicon"
              color="#f50"
            />
            <View style={styles.settingTextBox}>
              <Text style={styles.settingText}>about</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
