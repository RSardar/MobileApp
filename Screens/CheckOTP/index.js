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
import CountDown from 'react-native-countdown-component';

import styles from "./styles";
export default class CheckOTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp1: '',
      otp2:'',
      otp3:'',
      otp4:'',
      recendShow: false,
      counterShow: true,
  };
  };
  
  //Example Name is like userFullName and e is value of the box
  handleChange = (e, name) => { 
    this.setState({ [name]: e });
    // alert(name);
    // alert(name.focus);
    // this.state.otp2.focus();
    // if(e.length == 1 ){
    //   name.focus
    // }
  };
  sendRecendCode = ()=>{
    if(this.state.recendShow == false){
      this.setState({ recendShow : true});
      this.setState({ counterShow : false});
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
          
    const api = "55632cf8-cce7-11ea-9fa5-0200cd936042";
    var url = `https://2factor.in/API/V1/${api}/SMS/${this.props.route.params.mobileNumber}/${otp}`;
    return fetch(url)
        .then((response) => response.json())
        .then((json) => {
          // alert( json.Details);
          if(json.Status == 'Success'){
            this.props.navigation.navigate("CheckOTP");
          }
        })
  }
  otpValidation = () => {
    const allOtp = `${this.state.otp1}${this.state.otp2}${this.state.otp3}${this.state.otp4}`;
    // alert(allOtp);
    this.props.navigation.navigate('Profile');
    // return fetch(url)
    // .then((response) => response.json())
    // .then((json) => {
    //   alert( json.id);
     
    // })
  }

  render() {
    const { navigation  } = this.props;  
    const { otp1,otp2,otp3,otp4} = this.state;
    // const myMobile = navigation.getParam('userName');
    
    return (
     <View>
         <HeaderMain />
         <LogoImage />
         
         <Text style={styles.verificationMainText}>enter verification code</Text>
         <Text  style={styles.verificationNormalText}>we have sent you a 4 digit verification code on</Text>
         <Text style={styles.recendNumber}>+91 {this.props.route.params.mobileNumber}</Text>
         
         <View style={styles.fourOtps}>
          <InputBox
            name="otp1"
            placeholder={""}
            customDesign={[styles.custominputBox]}
            value={otp1}
            handleChange={this.handleChange}
            keyType={'numeric'}
            // focus={true}
          />
          <InputBox
            name="otp2"
            placeholder={""}
            customDesign={[styles.custominputBox]}
            value={otp2}
            handleChange={this.handleChange}
            keyType={'numeric'}
            // focus={true}
          />
          <InputBox
            name="otp3"
            placeholder={""}
            customDesign={[styles.custominputBox]}
            value={otp3}
            handleChange={this.handleChange}
            keyType={'numeric'}
          />
          <InputBox
            name="otp4"
            placeholder={""}
            customDesign={[styles.custominputBox,{marginRight: 0}]}
            value={otp4}
            handleChange={this.handleChange}
            keyType={'numeric'}
          />

         </View>
         <View>
         {    
         this.state.counterShow ?
         <CountDown
                until={60*60+30}
                size={15}
                onFinish={this.sendRecendCode}
                digitStyle={styles.counterDesignBox}
                digitTxtStyle={styles.counterDesignText}
                timeToShow={['H','M']}
                timeLabels={{h: '', m: ''}}
            /> : null
            }
           {
             this.state.recendShow ? <ButtonTouchable 
             text={"recend code"}
             customDesign={[styles.customBtn,styles.recendBtn]}
           customBtnDesign={[
             styles.customBtnText,styles.recendBtnText
             ]}
           /> :null 
           }
         </View>
         
         <ButtonTouchable 
          text={'submit'}
          customDesign={styles.customBtn}
          customBtnDesign={[
              styles.customBtnText
            ]}
            onClick={this.otpValidation}  
            />
             
     </View>
    );
  }
}
