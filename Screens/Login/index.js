import React, { useState } from "react";
import { Text, View } from "react-native";
import HeaderMain from "../../components/HeaderMain";
import InputBox from "../../components/InputBox";
import ErrorText from "../../components/ErrorText";
import ButtonTouchable from "../../components/ButtonTouchable";
import SocialLogin from "../../components/SocialLogin";
import LogoImage from "../../components/LogoImage";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
const serverIp = `192.168.0.113`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: "rakesh.leelija@gmail.com",
      loginPass: "12345",
      errorMsg: "",
      userDetails: "",
      loggedIn: false,
    };
  }
  componentDidMount() {
    if (this.state.loggedIn) {
      alert("hello from state");
      this.props.navigation.navigate("Welcome");
    } else {
      this.storedData();
    }
  }
  //Local Storage
  storeData = async (value1, value2) => {
    try {
      //Use Always Object
      await AsyncStorage.setItem("loggedIn", JSON.stringify(value1));
      await AsyncStorage.setItem("userId", JSON.stringify(value2));
      this.setState({ loggedIn: true });
      // console.log(value);
    } catch (e) {
      // saving error
      alert(e);
    }
  };
  //Pre Stored Data

  storedData = async () => {
    try {
      const value = await AsyncStorage.getItem("loggedIn");
      if (value !== null) {
        // value previously stored
        let getValue = JSON.parse(value);
        if (getValue == "yes") {
          this.props.navigation.navigate("Welcome");
        } else if (getValue == "no") {
          this.props.navigation.navigate("Login");
        }
        // console.log(getValue);
        // alert(getValue);
      }
    } catch (e) {
      // error reading value
      alert(e);
      console.log(e);
    }
  };
  //Clicked on Logo
  goHome = () => {
    this.props.navigation.navigate("Welcome");
  };
  validationCheck = (value) => {
    let pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(value)) {
      return 0; // Wrong Email
    } else {
      return 1; //Valid Email
    }
  };
  empty = (value) => {
    value = value.trim();
    if (value === "" || value == "0") {
      return 1;
    }
  };

  loginChecked = () => {
    let userEmail = this.state.loginEmail;
    let userPass = this.state.loginPass;
    let self = this;
    if (this.empty(userEmail) && this.empty(userPass)) {
      this.setState({ errorMsg: `Please enter Your Email and Password` });
    } else if (this.empty(userEmail)) {
      this.setState({ errorMsg: `Please enter Your Email` });
    } else if (!this.validationCheck(userEmail.trim())) {
      this.setState({ errorMsg: `Please enter Valid Email` });
    } else if (this.empty(userPass)) {
      this.setState({ errorMsg: `Please enter correct Password` });
    } else {
      let checkLoginUrl = `${serverUrl}user.php?email=${this.state.loginEmail}&pass=${this.state.loginPass}`;
      console.log(checkLoginUrl);
      axios(checkLoginUrl)
        .then(function (res) {
          // console.log(res.data);
          let returnData = parseInt(res.data);
          console.log(res.data);
          if (returnData) {
            self.storeData("yes", returnData);
            self.props.navigation.navigate("Welcome");
          } else {
            self.setState({ errorMsg: `Wrong Email or Password` });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  //Go to Register Page
  registerPage = () => {
    this.props.navigation.navigate("Register");
  };

  render() {
    const { loginEmail, loginPass, errorMsg } = this.state;
    return (
      <View style={styles.mainBody}>
        <HeaderMain />

        <View style={styles.bodySection}>
          <LogoImage onClickHere={this.goHome} />
          <View style={styles.customBody}>
            <Text style={styles.loginHeadingText}>
              Join With Us and Share Your Captures
            </Text>
            <ErrorText msg={errorMsg} />
            <View style={styles.loginBoxes}>
              <InputBox
                name="userEmail"
                // secureTextEntry={true}
                placeholder={"Enter Email"}
                customDesign={[styles.custominputBox, styles.loginEmail]}
                value={loginEmail}
                handleChange={(loginEmail) => this.setState({ loginEmail })}
                textType={"none"}
                keyType={"email-address"}
              />
              <InputBox
                placeholder={"Enter Password"}
                customDesign={[styles.custominputBox, styles.loginPass]}
                value={loginPass}
                handleChange={(loginPass) => this.setState({ loginPass })}
                textType={"none"}
                keyType={"visible-password"}
                secure={true}
              />
            </View>
            <View style={styles.loginRegBox}>
              <View style={styles.loginRegSection}>
                <ButtonTouchable
                  text={"login"}
                  customBtnDesign={[styles.customBtn, styles.loginBtnDesign]}
                  onClick={this.loginChecked}
                />
              </View>
            </View>
          </View>
          <View style={styles.registerNForget}>
            <ButtonTouchable
              text={"forget password"}
              customDesign={styles.customBtn}
              customBtnDesign={[
                styles.customBtnText,
                styles.forgetBtnDesignText,
              ]}
            />
            <ButtonTouchable
              text={"register"}
              customDesign={styles.customBtn}
              customBtnDesign={[
                styles.customBtnText,
                styles.registerBtnDesignText,
              ]}
              onClick={this.registerPage}
            />
          </View>
          <View style={styles.divider}></View>
          <SocialLogin />
        </View>
      </View>
    );
  }
}
