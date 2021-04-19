import React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Modal,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { Icon, Divider, Input, Button } from "react-native-elements";
// const serverIp = `betterpiping.com`;
// const fileFolder = `jsonClasses`;
const serverIp = `192.168.0.119`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
export default class Security extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changePass: false,
      passChangedSuccess: false,
      oldPass: "",
      newPass: "",
      reNewPass: "",
      newPassNotMatched: "",
      matchOldWithNewPass: "",
    };
  }
  componentDidMount() {
    console.log("-----------");
  }

  GenerateNewPass = () => {
    let self = this;
    let url = `${serverUrl}password.php?pass=${this.state.oldPass}&newPass=${this.state.newPass}`;
    if (!this.state.newPassNotMatched && !this.state.matchOldWithNewPass) {
      console.log(url);
      axios(url).then((res) => {
        if (parseInt(res.data)) {
          self.setState({
            passChangedSuccess: true,
          });
          setTimeout(() => {
            self.setState({
              passChangedSuccess: false,
              changePass: false,
            });
          }, 1500);
        }
      });
    }
  };

  NewpassMatchWIthOldPass = (newPass) => {
    let oldPasss = this.state.oldPass;
    if (oldPasss == newPass) {
      this.setState({
        matchOldWithNewPass: "New Password Can not be Same As Old Pass",
      });
    } else {
      this.setState({
        matchOldWithNewPass: "",
      });
    }
  };

  //Modal Close
  CloseModal = () => {
    this.setState({
      changePass: false,
    });
  };

  //Click to Change Password
  ChangePass = () => {
    this.setState({
      changePass: true,
    });
  };

  //Handel Old Password
  oldPassCheck = (e) => {
    this.setState({ oldPass: e });
  };
  //Handel New Password
  checkNewpass = (e) => {
    this.NewpassMatchWIthOldPass(e);
    this.setState({
      newPass: e,
    });
  };
  ReTypeNewPass = (e) => {
    let newPasword = this.state.newPass;
    if (newPasword !== e) {
      this.setState({
        newPassNotMatched: "Does not Match with New Password",
      });
    } else {
      this.setState({
        newPassNotMatched: "",
      });
    }
    this.setState({
      reNewPass: e,
    });
  };

  render() {
    const { name } = this.props;

    const { oldPass, newPass, reNewPass } = this.state;
    return (
      <View style={styles.mainBody}>
        <Modal animationType="fade" visible={this.state.passChangedSuccess}>
          <View style={styles.securityModalBox}>
            <View style={styles.passChangeSuccessBox}>
              <Text style={styles.passChangeSuccessText}>
                Password Changed Successfully
              </Text>
            </View>
          </View>
        </Modal>
        <Modal animationType="fade" visible={this.state.changePass}>
          <View style={styles.securityModalBox}>
            <View style={styles.commonFlex}>
              <Icon
                name={"close-outline"}
                type="ionicon"
                color="#f50"
                size={30}
                onPress={() => this.CloseModal()}
              />
              <Text style={{ fontSize: 18 }}>Change Password</Text>
            </View>
            <View>
              <View>
                <Input
                  placeholder="Old Password"
                  leftIcon={{ type: "ionicon", name: "finger-print-outline" }}
                  secureTextEntry={true}
                  value={this.state.oldPass}
                  name={name}
                  onChangeText={(text) => this.oldPassCheck(text)}
                />
              </View>
              <View>
                <Input
                  placeholder="New Password"
                  leftIcon={{ type: "ionicon", name: "lock-closed-outline" }}
                  secureTextEntry={true}
                  value={this.state.newPass}
                  errorMessage={this.state.matchOldWithNewPass}
                  onChangeText={(text) => this.checkNewpass(text)}
                />
              </View>
              <View>
                <Input
                  placeholder="Re-Enter New Password"
                  leftIcon={{ type: "ionicon", name: "lock-closed-outline" }}
                  secureTextEntry={true}
                  value={this.state.reNewPass}
                  errorMessage={this.state.newPassNotMatched}
                  onChangeText={(text) => this.ReTypeNewPass(text)}
                />
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Button
                containerStyle={styles.changePassBtnBox}
                buttonStyle={styles.changePassBtn}
                onPress={() => this.GenerateNewPass()}
                icon={
                  <Icon name="key" type="fontisto" size={20} color="white" />
                }
                iconLeft
                title=" Change Password"
              />
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          underlayColor="#DDDDDD"
          style={[styles.commonFlex, styles.eachSetting]}
          onPress={() => this.ChangePass()}
        >
          <View style={[styles.commonFlex]}>
            <Icon name={"key-outline"} type="ionicon" color="#f50" />
            <View style={styles.settingTextBox}>
              <Text style={styles.settingText}>password</Text>
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
            <Icon name={"mail-outline"} type="ionicon" color="#f50" />
            <View style={styles.settingTextBox}>
              <Text style={styles.settingText}>email</Text>
            </View>
          </View>
        </TouchableHighlight>
        <Divider />
        <TouchableHighlight
          underlayColor="#DDDDDD"
          style={[styles.commonFlex, styles.eachSetting]}
        >
          <View style={[styles.commonFlex]}>
            <Icon name={"location-outline"} type="ionicon" color="#f50" />
            <View style={styles.settingTextBox}>
              <Text style={styles.settingText}>activities</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
