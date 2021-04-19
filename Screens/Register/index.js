import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView 
} from "react-native";
import HeaderMain from "../../components/HeaderMain";
import InputBox from "../../components/InputBox";
import ErrorText from "../../components/ErrorText";
import ButtonTouchable from "../../components/ButtonTouchable";
import SocialLogin from "../../components/SocialLogin";
import LogoImage from "../../components/LogoImage";
import styles from "./styles";
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userFullName:'',
      userName:'',
      userEmail:'',
      userMobile:'',
      userPass:'',
      userCnfmPass:'',
      errorMsg:''};
  };
  goHome = ()=>{
    this.props.navigation.navigate("Welcome");
  }
  
  //Example Name is like userFullName and e is value of the box
  handleChange = (e, name) => { 
    this.setState({ [name]: e });
  };

   validationCheck = (value)=>{
    let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if(!pattern.test(value)){
      return 0; // Wrong Email
    }
    else{
      return 1; //Valid Email
    }
   } 

  empty = (value)=>{
    value = value.trim();
    if(value==='' || value == '0'){
      return 1;// Return 1 if Empty Return 0 means has some value
    }
  }

  registerNew = () => {
    let regName = this.state.userFullName;
    let regUserName = this.state.userName;
    let reguserEmail = this.state.userEmail;

    let reguserMobile = this.state.userMobile;
    let reguserPass = this.state.userPass;
    let reguserCnfmPass = this.state.userCnfmPass; 

    let regArr = [regName,regUserName,reguserEmail,reguserMobile,reguserPass,reguserCnfmPass];

    
    if(reguserPass === reguserCnfmPass){
      // alert(emptyArr.length);
      if(this.empty(regName)){
        this.setState({errorMsg: `Please Enter Your Full Name`});
      }
      else if(this.empty(regUserName)){
        this.setState({errorMsg: `Please Enter a User Name`});
      }
      else if(this.empty(reguserEmail)){
        this.setState({errorMsg: `Please Enter an Email`});
      }
      else if(!this.validationCheck(reguserEmail)){
        this.setState({errorMsg: `Please Enter a Valid Email`});
      }
      else if(this.empty(reguserMobile)){
        this.setState({errorMsg: `Please Enter Mobile Number`});
      }
      else if(reguserMobile.length != 10){
        this.setState({errorMsg: `Please Enter 10 Digits Mobile Number`});
      }
      else if(this.empty(reguserPass)){
        this.setState({errorMsg: `Please Enter a Password`});
      }
      else if(this.empty(reguserCnfmPass)){
        this.setState({errorMsg: `Please Confrim Your Password`});
      }
      else{
        alert("All Right Thank You");
      }
    }
    else{
      this.setState({errorMsg: `Password not Matched`});
    }    
  }; //End Of Register

  //Login Clicked
  loginPage = ()=>{
    // alert("Clicked on Login Page");
    this.props.navigation.navigate("Login");
  }

  render() {
    const { userFullName,userName,userEmail,userMobile,userPass,userCnfmPass,errorMsg} = this.state;
    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding">
      <View style={styles.mainBody}>
        
        <HeaderMain />

        <View style={styles.bodySection}>
        <LogoImage onClickHere={this.goHome} />
          <View style={styles.customBody}>
            <Text style={styles.loginHeadingText}>
              Register
            </Text>
            <ErrorText msg={errorMsg} />
            <View style={styles.loginBoxes}>
              <InputBox
                name="userFullName"
                placeholder={"Enter Full Name"}
                customDesign={[styles.custominputBox, styles.loginEmail]}
                value={userFullName}
                handleChange={this.handleChange}
              />
              <InputBox
                name="userName"
                placeholder={"Enter Username"}
                customDesign={[styles.custominputBox, styles.loginEmail]}
                value={userName}
                handleChange={this.handleChange}
              />
              <InputBox
                name="userEmail"
                placeholder={"Enter Your Email"}
                customDesign={[styles.custominputBox, styles.loginEmail]}
                value={userEmail}
                handleChange={this.handleChange}
              />
              <InputBox
                name="userMobile"
                placeholder={"Enter Your Mobile Number"}
                keyType={'numeric'}
                customDesign={[styles.custominputBox, styles.loginEmail]}
                value={userMobile}
                handleChange={this.handleChange}
              />
              <InputBox
                name="userPass"
                secure={true}
                placeholder={"Enter Type a Password"}
                customDesign={[styles.custominputBox, styles.loginEmail]}
                value={userPass}
                handleChange={this.handleChange}
              />
               <InputBox
                name="userCnfmPass"
                secure={true}
                placeholder={"Confirm Your Password"}
                customDesign={[styles.custominputBox, styles.loginEmail]}
                value={userCnfmPass}
                handleChange={this.handleChange}
              />
            </View>
            <View style={styles.loginRegBox}>
              <View style={styles.loginRegSection}>
                <ButtonTouchable
                  text={"register"}
                  customBtnDesign={[styles.customBtn, styles.loginBtnDesign]}
                  onClick={this.registerNew}
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
              text={"login"}
              customDesign={styles.customBtn}
              customBtnDesign={[
                styles.customBtnText,
                styles.registerBtnDesignText,
              ]}
              onClick={this.loginPage}
            />
          </View>
          <View style={styles.divider}></View>
          <SocialLogin />
        </View>
        {/* <View style={{ height: 260 }} /> */}
        
      </View>
      </KeyboardAvoidingView>
    );
  }
}
